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
      className="group shadow-xl bg-neutral-50 border-2 rounded-md border-neutral-200 p-3 hover:scale-105 hover:cursor-pointer transition-transform "
    >
      <header className="">
        <div className="relative w-[320px] h-[200px]">
          <img
            src={video?.thumbnail}
            alt="video thumbnail"
            className="w-full h-full rounded-md"
          />

          <div className="absolute pointer-events-none flex ites-end top-0 w-full h-full bg-gradient-to-b from-[#000000de] from-0% via-90% to-transparent to-70%">
            <p className=" text-white p-2">{shrinkText(video!.title, 100)}</p>
          </div>

          <div className="absolute right-2 bottom-2 bg-neutral-900 bg-opacity-70 text-white px-3 py-[1px]">
            {video?.duration}
          </div>
        </div>
      </header>
    </div>
  );
};
