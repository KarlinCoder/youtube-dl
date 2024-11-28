import { FaDownload } from "react-icons/fa6";
import { VideoResolution } from "../types";

interface DownloadButtonProps {
  disabled?: boolean;
  text: string;
  num: VideoResolution;
  handleDownload: (res: VideoResolution) => void;
  handleClick: (value: boolean) => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  disabled = false,
  text,
  num,
  handleClick,
  handleDownload,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        handleDownload(num);
        handleClick(true);
      }}
      className="flex justify-center gap-2 px-4 py-2 items-center disabled:bg-neutral-500 bg-green-500 text-white text-md  hover:bg-green-600 transition-none active:bg-green-500 rounded-md cursor-pointer "
    >
      <FaDownload />
      <p className="text-white text-sm">{text}</p>
    </button>
  );
};
