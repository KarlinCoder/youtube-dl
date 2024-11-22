import { Modal } from "./Modal";
import { Video as VideoType } from "../types";
import { useEffect, useState } from "react";
import { type VideoResolution } from "../types";
import { shrinkText } from "../lib/shrinkText";
import { FaDownload } from "react-icons/fa6";

interface VideoCardProps {
  video: VideoType;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [resolution, setResolution] = useState<VideoResolution>();
  const [showDowload, setShowDowload] = useState(false);

  useEffect(() => {
    const API = `https://core.gv.cmnetworkusercontent.com/convert/${resolution}`;
  }, [video.id, resolution]);

  useEffect(() => {
    if (showDowload) {
      document.body
        .querySelector(".app-wrapper_custom")
        ?.classList.add("sm:overflow-hidde");
    } else {
      document.body
        .querySelector(".app-wrapper_custom")
        ?.classList.remove("sm:overflow-hidde");
    }
  }, [showDowload]);

  const handleModal = (value: boolean) => {
    setShowDowload(value);
  };

  return (
    <div className="shadow-xl bg-neutral-50 border-2 rounded-md border-neutral-200 p-4">
      <header className="">
        <div className="w-[200px] h-[110px]">
          <img
            src={video.thumbnail}
            alt="video thumbnail"
            className="w-full h-full rounded-md"
          />
        </div>

        <h2 className="text-neutral-800">{shrinkText(video.title, 20)}</h2>
        <button
          onClick={() => setShowDowload(true)}
          className="flex place-items-center gap-2 rounded-sm bg-green-500 px-3 py-[6px] text-sm text-white hover:bg-green-600 active:bg-green-500 mt-2"
        >
          <FaDownload className="inline-block" />
          <p className="inline-block">Descargar</p>
        </button>
      </header>

      {showDowload && <Modal onShow={handleModal} video={video} />}
    </div>
  );
};
