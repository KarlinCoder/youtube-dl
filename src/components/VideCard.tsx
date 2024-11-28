import { Video as VideoType } from "../types";
// import { type VideoResolution } from "../types";
import { shrinkText } from "../lib/shrinkText";

interface VideoCardProps {
  video: VideoType | null;
  modalShow: (show: true) => void;
  modalVideo: (video: VideoType) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  modalShow,
  modalVideo,
}) => {
  return (
    <div
      onClick={() => {
        modalShow(true);
        modalVideo(video!);
      }}
      className="group shadow-xl bg-neutral-50 border-2 border-neutral-200 p-[6px] hover:scale-[1.03] hover:cursor-pointer transition-transform "
    >
      <header className="">
        <div className="relative w-[280px] h-[160px]  rounded-md overflow-hidden">
          <img
            src={video?.thumbnail}
            alt="video thumbnail"
            className="w-full h-full"
          />

          <div className="absolute pointer-events-none flex ites-end top-0 w-full h-full bg-gradient-to-b from-[#000000de] from-0% via-90% to-transparent to-70%">
            <p className=" text-white p-2 text-sm">
              {shrinkText(video!.title, 100)}
            </p>
          </div>

          <div className=" text-sm absolute right-2 bottom-2 bg-neutral-900 bg-opacity-70 text-white px-3 py-[1px]">
            {video?.duration}
          </div>
        </div>
      </header>
    </div>
  );
};
