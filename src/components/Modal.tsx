import { VideoResolution, Video as VideoType } from "../types";
import { shrinkText } from "../lib/shrinkText";
import { DownloadButton } from "./DownloadButton";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { VscLoading } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa6";

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

    return () =>
      window.document
        .querySelector("body")
        ?.classList.remove("overflow-y-hidden");
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
            const url = `${data.stream}?download=${video?.title}(${res}p)`;
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
        <IoMdCloseCircle
          onClick={() => onShow(false)}
          className="absolute top-4 right-5 text-red-500 hover:text-red-600 active:text-red-500 scale-[1.8] cursor-pointer"
        />
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-around items-center">
          <header className="flex flex-col items-center">
            <div className="max-w-[290px] max-h-[170px] w-full h-full mx-auto border">
              <img
                src={video!.thumbnail}
                alt="video thumbnail"
                className="w-full h-full object-cover select-none"
              />
            </div>
            <p className="truncate leading-2 text-lg text-center max-w-[300px]">
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
          <div className="absolute grid place-items-center w-full h-full bg-black bg-opacity-20 p-4">
            <main className="relative p-3 flex flex-col justify-center gap-5 items-center max-w-[90%] h-auto bg-white rounded-md">
              <IoMdCloseCircle
                onClick={() => setOnProcess(false)}
                className="absolute top-4 right-5 text-red-500 hover:text-red-600 active:text-red-500 scale-[1.8] cursor-pointer"
              />
              <header className="flex w-full justify-center items-center gap-2">
                <span className="scale-[1.3]">
                  {!videoLink ? (
                    <VscLoading className="animate-spin" />
                  ) : (
                    <FaCheck />
                  )}
                </span>
                {!videoLink ? (
                  <p className="text-lg">{statusMessage}...</p>
                ) : (
                  <p className="text-lg">Completado</p>
                )}
              </header>

              <section className="w-full">
                <div className="relative mx-auto max-w-[400px] w-full h-[30px] bg-neutral-400 rounded-lg overflow-hidden">
                  <div
                    style={{
                      width: `${downloadProgress}%`,
                      transition: "width 0.5s ease",
                    }}
                    className="flex justify-center items-center h-full bg-neutral-600"
                  >
                    <p className="absolute top-0 left-0 pt-[2px] w-full h-full text-center text-white">
                      {downloadProgress}%
                    </p>
                  </div>
                </div>
              </section>
              <button
                disabled={!videoLink}
                onClick={() => {
                  window.location.href = videoLink;
                }}
                className="bg-green-500 hover:bg-green-600 active:bg-green-500 disabled:bg-neutral-500 px-3 py-2 text-white text-sm rounded-md"
              >
                Descargar video
              </button>
            </main>
          </div>
        )}
      </main>
    </section>
  );
};
