import { FaDownload } from "react-icons/fa6";
import { VideoResolution } from "../types";

interface DownloadButtonProps {
  disabled?: boolean;
  text: string;
  num: VideoResolution;
  handleDownload: (res: VideoResolution) => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  disabled = false,
  text,
  num,
  handleDownload,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => handleDownload(num)}
      className="flex justify-center gap-2 px-4 py-2 items-center disabled:bg-neutral-500 bg-green-500 text-white text-md  hover:bg-green-600 transition-none active:bg-green-500 rounded-md cursor-pointer"
    >
      <FaDownload />
      <p className="text-white">{text}</p>
    </button>
  );
};
