import { Video as VideoType } from "../types";
import { VideoCard } from "./VideCard";

interface VideoContainerProps {
  videosArray: Array<VideoType>;
  toVideoCardModalShow: (show: boolean) => void;
  toVideoCardModalVideo: (video: VideoType) => void;
}

export const VideoContainer: React.FC<VideoContainerProps> = ({
  videosArray,
  toVideoCardModalShow,
  toVideoCardModalVideo,
}) => {
  return (
    <main className="flex flex-wrap justify-center gap-4 box-border p-6 h-full w-full max-w-[1100px]">
      {videosArray.map((video) => {
        return (
          <VideoCard
            video={video}
            key={video.id}
            modalShow={toVideoCardModalShow}
            modalVideo={toVideoCardModalVideo}
          />
        );
      })}
    </main>
  );
};
