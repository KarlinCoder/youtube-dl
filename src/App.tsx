import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import { VideoContainer } from "./components/VIdeosContainer";
import { getVideos } from "./lib/getVideos";
import { Video as VideoType } from "./types";

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState("");
  const [inputText, setInputText] = useState("");
  const [videosArray, setVideosArray] = useState<Array<VideoType>>([]);

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

  return (
    <div className="flex flex-col justify-center items-center min-w-dvh min-h-dvh box-border">
      <Input onSearch={handleInputSearch} />
      {loading && <p>Cargando videos...</p>}
      {isEmpty && <p>No se encontraron videos</p>}
      {error && <p>{error}</p>}
      {videosArray.length > 0 && <VideoContainer videosArray={videosArray} />}
    </div>
  );
};
