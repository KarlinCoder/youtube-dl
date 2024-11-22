import { Video as VideoType } from "../types";
import { VideoCard } from "./VideCard";

interface VideoContainerProps {
  videosArray: Array<VideoType>;
}

export const VideoContainer: React.FC<VideoContainerProps> = ({
  videosArray,
}) => {
  return (
    <main className="flex flex-wrap justify-center gap-4 box-border p-6 h-full">
      {videosArray.map((video) => {
        return <VideoCard video={video} key={video.id} />;
      })}
    </main>
  );
};
