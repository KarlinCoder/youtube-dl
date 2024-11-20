import { Video as VideoType } from "../types";
const API = "https://youtube-search-api-2-edh3.onrender.com/api/search?q=";

export const getVideos = async (
  keywords: string
): Promise<Array<VideoType>> => {
  const data = await fetch(`${API}${keywords}`).then((r) => r.json());
  return data;
};
