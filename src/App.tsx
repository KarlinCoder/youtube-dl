import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import { VideoContainer } from "./components/VIdeosContainer";
import { getVideos } from "./lib/getVideos";
import { Video, Video as VideoType } from "./types";
import { Footer } from "./components/Footer";
import { Modal } from "./components/Modal";

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState("");
  const [inputText, setInputText] = useState("");
  const [videosArray, setVideosArray] = useState<Array<VideoType>>([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalVideo, setmodalVideo] = useState<VideoType | null>(null);

  useEffect(() => {
    const handleVideos = async () => {
      setLoading(true);
      try {
        if (inputText !== "") {
          const videos = await getVideos(inputText);
          setVideosArray(videos);
          if (videos.length === 0) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
          }
          setError("");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
          setError(error.message);
        }
      }
      setLoading(false);
    };

    handleVideos();
  }, [inputText]);

  const handleInputSearch = (input: string) => {
    setInputText(input);
  };

  const handleModalShow = (show: boolean) => {
    setModalShow(show);
  };

  const handleModalVideo = (video: VideoType) => {
    setmodalVideo(video);
  };

  return (
    <div className="flex flex-col justify-between items-center min-w-dvh min-h-dvh box-border bg-gradient-to-br from-white to-neutral-200">
      <Input onSearch={handleInputSearch} loading={loading}>
        {isEmpty && <p>No se encontraron videos</p>}
        {error && <p>{error}</p>}
      </Input>

      {videosArray.length > 0 && (
        <VideoContainer
          videosArray={videosArray}
          toVideoCardModalShow={handleModalShow}
          toVideoCardModalVideo={handleModalVideo}
        />
      )}

      {modalShow && <Modal onShow={handleModalShow} video={modalVideo} />}

      <Footer />
    </div>
  );
};
