import { VideoResolution, Video as VideoType } from "../types";
import { shrinkText } from "../lib/shrinkText";
import { DownloadButton } from "./DownloadButton";
import { useEffect } from "react";

interface ModalProps {
  video: VideoType | null;
  onShow: (show: boolean) => void;
}

const resolutionArray: Array<VideoResolution> = [144, 240, 360, 480, 720, 1080];

export const Modal: React.FC<ModalProps> = ({ video, onShow }) => {
  useEffect(() => {
    window.document.querySelector("body")?.classList.add("overflow-y-hidden");

    return () =>
      window.document
        .querySelector("body")
        ?.classList.remove("overflow-y-hidden");
  }, []);

  const handleDownload = (res: VideoResolution) => {
    const serverConvertUrl = `https://core.gv.cmnetworkusercontent.com/convert/${
      video!.id
    }/${res}`;
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
      className="fixed w-screen h-screen flex justify-center items-center bg-neutral-500 bg-opacity-50 z-0 top-0 left-0 bottom-0 p-5"
      onClick={() => onShow(false)}
    >
      <main
        onClick={(e) => e.stopPropagation()}
        className="relative animation-modal-on flex flex-col sm:gap-5 justify-center rounded-md shadow-lg items-center bg-neutral-100 max-w-[800px] w-full p-6"
      >
        <div className="flex flex-col flex-wrap sm:flex-row gap-2 w-full justify-around items-center box-border">
          <header className="hiddenx sm:blockx">
            <div className="w-[310px] h-[190px] mx-auto border-">
              <img
                src={video!.thumbnail}
                alt="video thumbnail"
                className="w-full h-full select-none"
              />
            </div>
            <p className="leading-2 text-lg leading-2 text-center max-w-[350px]">
              {shrinkText(video!.title, 100)}
            </p>
          </header>
          <section className="">
            <aside className="">
              {resolutionArray.map((item) => {
                return (
                  <div className="flex odd:bg-[#eee]">
                    <div className="flex justify-center items-center p-4 w-[120px]">
                      <p className="text-sm">{item}p (.mp4)</p>
                    </div>
                    <div className="p-4">
                      <DownloadButton
                        handleDownload={handleDownload}
                        num={item}
                        text="Descargar"
                      />
                    </div>
                  </div>
                );
              })}
            </aside>
          </section>
        </div>

        {/* <div className="absolute w-full h-full bg-black"></div> */}
      </main>
    </section>
  );
};
