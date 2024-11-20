// "https://core.gv.cmnetworkusercontent.com/convert/LXb3EKWsInQ/1080"

const API = "https://core.gv.cmnetworkusercontent.com/convert/";

type Resolution = 1090 | 720 | 480 | 360 | 240 | 144;

export const getVideoFile = async (id: string, resolution: Resolution) => {
  const videoInfo = await fetch(`${API}${id}/${resolution}`);
  return videoInfo;
};
