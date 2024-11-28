import { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { VscLoading } from "react-icons/vsc";

interface SubModalProps {
  setOnProcess: (value: boolean) => void;
  setVideoLink: (link: string) => void;
  setStatusMessage: (text: string) => void;
  setDownloadProgress: (value: number) => void;
  videoLink: string;
  statusMessage: string;
  downloadProgress: number;
}

export const SubModal: React.FC<SubModalProps> = ({
  setOnProcess,
  videoLink,
  statusMessage,
  downloadProgress,
  setVideoLink,
  setStatusMessage,
  setDownloadProgress,
}) => {
  useEffect(() => {
    return () => {
      setVideoLink("");
      setStatusMessage("Procesando");
      setDownloadProgress(0);
    };
  }, [setVideoLink, setStatusMessage, setDownloadProgress]);

  return (
    <div className="absolute grid place-items-center w-full h-full bg-black bg-opacity-20 p-4">
      <main className="relative shadow-xl p-3 flex flex-col justify-center gap-5 items-center w-full h-full max-w-[400px] max-h-[300px] bg-white rounded-md">
        <IoIosClose
          onClick={() => setOnProcess(false)}
          className="absolute top-4 right-4  text-red-500 hover:text-red-600 active:text-red-500 scale-[2.5] cursor-pointer hover:scale-[2.7] transition-transform"
        />
        <header className="flex w-full justify-center items-center gap-2">
          <span className="scale-[1.3]">
            {!videoLink ? <VscLoading className="animate-spin" /> : <FaCheck />}
          </span>
          {!videoLink ? (
            <p className="text-lg">{statusMessage}...</p>
          ) : (
            <p className="text-lg">Completado</p>
          )}
        </header>

        <section className="w-full">
          <div className="relative mx-auto max-w-[300px] w-full h-[30px] bg-neutral-400 rounded-lg overflow-hidden">
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
  );
};
