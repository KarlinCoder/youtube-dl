import { useEffect, useState } from "react";
import { VideoResolution, Video as VideoType } from "../types";
import { shrinkText } from "../lib/shrinkText";
import { DownloadButton } from "./DownloadButton";

interface ModalProps {
  video: VideoType;
  onShow: (value: boolean) => void;
}

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-5 right-5 cursor-pointer group"
    aria-label="Close modal"
  >
    <div className="relative w-6 h-6">
      <span className="absolute top-0 left-0 w-full h-[3px] bg-red-500 rounded-full rotate-45 transition-transform duration-300 ease-in-out group-hover:bg-red-600 group-active:bg-red-500"></span>
      <span className="absolute top-0 left-0 w-full h-[3px] bg-red-500 rounded-full -rotate-45 transition-transform duration-300 ease-in-out group-hover:bg-red-600 group-active:bg-red-500"></span>
    </div>
  </div>
);

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
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [video.id]);

  const handleDownload = (res: VideoResolution) => {
    const serverConvertUrl = `https://core.gv.cmnetworkusercontent.com/convert/${video.id}/${res}`;
    const evtSource = new EventSource(serverConvertUrl);

    evtSource.addEventListener(
      "close",
      (evt) => {
        evtSource.close();
        try {
          const data = JSON.parse(evt.data);
          if (data?.stream) {
            const url = `${data.stream}?download=diablo(${res}p)`;
            window.location.href = url;
          } else {
            console.error("Datos inválidos recibidos:", data);
          }
        } catch (error) {
          console.error("Error al parsear los datos:", error);
        }
      },
      false
    );
  };

  return (
    <section
      className="fixed w-screen h-screen flex justify-center items-center bg-neutral-500 bg-opacity-50 z-30 top-0 left-0 bottom-0 p-3"
      onClick={() => onShow(false)}
    >
      <main
        onClick={(e) => e.stopPropagation()}
        className="animation-modal-on relative flex flex-col justify-center rounded-md shadow-lg items-center bg-neutral-100 max-w-[700px] w-full p-5"
      >
        <CloseButton onClick={() => onShow(false)} />
        <header>
          <div className="w-[320px] h-[200px] mx-auto">
            <img
              src={video.thumbnail}
              alt="video thumbnail"
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
              />
            ))}
          </div>
        </section>
      </main>
    </section>
  );
};
