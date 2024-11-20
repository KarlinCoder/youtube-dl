import { useEffect, useState } from "react";
import { VideoResolution, Video as VideoType } from "../types";
import { shrinkText } from "../lib/shrinkText";
import { DownloadButton } from "./DownloadButton";
import { Video } from "youtubei";
import { FaCircleXmark } from "react-icons/fa6";

interface ModalProps {
  video: VideoType;
  onShow: (value: boolean) => void;
}

const resolutionArray: Array<VideoResolution> = [144, 240, 360, 480, 720, 1080];

export const Modal: React.FC<ModalProps> = ({ video, onShow }) => {
  const [videoResolutions, setVideoResolutions] = useState({
    "144": false,
    "240": false,
    "360": false,
    "480": false,
    "720": false,
    "1080": false,
  });

  useEffect(() => {
    window.document.querySelector("body")?.classList.add("overflow-hidden");

    const setAvailableResolutions = () => {
      const resolutions = ["144", "240", "360", "480", "720", "1080"];

      for (const resolution of resolutions) {
        let serverConvertUrl = `https://core.gv.cmnetworkusercontent.com/convert/${video.id}/${resolution}`;
        const evtSource = new EventSource(serverConvertUrl);

        evtSource.addEventListener(
          "close",
          (evt) => {
            evtSource.close();
            const data = JSON.parse(evt.data);
            // Actualiza el estado usando la resolución correcta como clave
            setVideoResolutions((state) => ({
              ...state,
              [resolution]: !!data.error, // true si hay error, false si no
            }));
          },
          false
        );
      }
    };

    setAvailableResolutions();

    return () => {
      window.document
        .querySelector("body")
        ?.classList.remove("overflow-hidden");
    };
  }, [video.id]);

  const handleDownload = (res: VideoResolution) => {
    let serverConvertUrl = `https://core.gv.cmnetworkusercontent.com/convert/${video.id}/${res}`;
    const evtSource = new EventSource(serverConvertUrl);

    evtSource.addEventListener(
      "close",
      (evt) => {
        evtSource.close();
        const data = JSON.parse(evt.data);
        const url = `${data.stream}?download=${video.title
          .split(" ")
          .join("_")}(${res}p)`;
        window.location.href = url;
      },
      false
    );
  };

  return (
    <section className="fixed w-screen h-screen flex justify-center items-center bg-neutral-500 bg-opacity-50 z-30 top-0 left-0 bottom-0 p-3">
      <main className="animation-modal-on relative flex flex-col justify-center rounded-md shadow-lg items-center bg-neutral-100 max-w-[700px] w-full p-5">
        <button
          onClick={() => onShow(false)}
          className="text-red-400 absolute top-5 right-5 scale-[2] hover:text-red-500 active:textred400"
        >
          <FaCircleXmark />
        </button>
        <header>
          <div className="w-[320px] h-[200px] mx-auto">
            <img
              src={video.thumbnail}
              alt="video cover"
              className="w-full h-full"
            />
          </div>
          <p className="leading-2 sm:text-xl sm:leading-2 text-center">
            {shrinkText(video.title, 100)}
          </p>
        </header>
        <section className="mt-5">
          <div className="flex justify-center box-border flex-wrap gap-1">
            {resolutionArray.map((res) => (
              <DownloadButton
                key={res}
                num={res}
                handleDownload={handleDownload}
                disabled={videoResolutions[res]}
              />
            ))}
          </div>
        </section>
      </main>
    </section>
  );
};
