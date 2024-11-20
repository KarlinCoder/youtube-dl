import { FaFilm } from "react-icons/fa6";
import { VideoResolution } from "../types";

interface DownloadButtonProps {
  disabled?: boolean;
  num: VideoResolution;
  handleDownload: (res: VideoResolution) => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  disabled = false,
  num,
  handleDownload,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => handleDownload(num)}
      className="flex justify-center gap-2 items-center disabled:bg-neutral-500 bg-green-500 text-white text-md w-[80px] h-[40px] hover:bg-green-600 active:bg-green-500 rounded-md transition-colors cursor-pointer"
    >
      <FaFilm />
      <p className="text-white">{num}p</p>
    </button>
  );
};
