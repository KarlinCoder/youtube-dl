import { VideoResolution, Video as VideoType } from "../types";
import { shrinkText } from "../lib/shrinkText";
import { DownloadButton } from "./DownloadButton";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

import { SubModal } from "./SubModal";

interface ModalProps {
  video: VideoType | null;
  onShow: (show: boolean) => void;
}

const resolutionArray: Array<VideoResolution> = [144, 240, 360, 480, 720, 1080];

export const Modal: React.FC<ModalProps> = ({ video, onShow }) => {
  const [onProcess, setOnProcess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Procesando");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [videoLink, setVideoLink] = useState("");

  useEffect(() => {
    window.document.querySelector("body")?.classList.add("overflow-y-hidden");

    return () => {
      window.document
        .querySelector("body")
        ?.classList.remove("overflow-y-hidden");
    };
  }, []);

  const handleDownloadClick = (value: boolean) => {
    setOnProcess(value);
  };

  const handleDownload = (res: VideoResolution) => {
    const serverConvertUrl = `https://core.gv.cmnetworkusercontent.com/convert/${
      video!.id
    }/${res}`;
    const evtSource = new EventSource(serverConvertUrl);

    evtSource.addEventListener("STATUS", (evt) => {
      const data = JSON.parse(evt.data);
      setStatusMessage(data.message);
    });

    evtSource.addEventListener("DOWNLOAD_FILE_STATUS", (evt) => {
      const data = JSON.parse(evt.data);
      setDownloadProgress(data.completed);
    });

    evtSource.addEventListener(
      "close",
      (evt) => {
        evtSource.close();
        try {
          const data = JSON.parse(evt.data);
          if (data?.stream) {
            setDownloadProgress(100);
            const url = `${data.stream}?download=${video?.title}_(${res}p)`;
            setVideoLink(url);
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
    <section className="fixed inset-0 flex justify-center items-center bg-neutral-500 bg-opacity-50 z-50 p-2">
      <main
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col gap-5 justify-center rounded-md shadow-lg items-center bg-neutral-100 max-w-[90%] sm:max-w-[800px] w-full p-6"
      >
        <IoIosClose
          onClick={() => onShow(false)}
          className="absolute top-4 right-5 text-red-500 hover:text-red-600 active:text-red-500 scale-[2.5] cursor-pointer hover:scale-[2.7] transition-transform"
        />
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-around items-center">
          <header className="flex flex-col items-center">
            <div className="max-w-[280px] max-h-[160px] w-full h-full mx-auto border">
              <img
                src={video!.thumbnail}
                alt="video thumbnail"
                className="w-full h-full object-cover select-none"
              />
            </div>
            <p className="truncate text-[1rem] text-center max-w-[280px]">
              {shrinkText(video!.title, 100)}
            </p>
          </header>
          <section className="">
            <aside>
              {resolutionArray.map((item) => (
                <div key={item} className="flex odd:bg-[#eee] p-3 ">
                  <div className="flex justify-center items-center w-[120px]">
                    <p className="text-sm">{item}p (.mp4)</p>
                  </div>
                  <div>
                    <DownloadButton
                      handleClick={handleDownloadClick}
                      handleDownload={handleDownload}
                      num={item}
                      text="Descargar"
                    />
                  </div>
                </div>
              ))}
            </aside>
          </section>
        </div>

        {onProcess && (
          <SubModal
            downloadProgress={downloadProgress}
            setOnProcess={setOnProcess}
            statusMessage={statusMessage}
            videoLink={videoLink}
            setDownloadProgress={setDownloadProgress}
            setStatusMessage={setStatusMessage}
            setVideoLink={setVideoLink}
          />
        )}
      </main>
    </section>
  );
};
