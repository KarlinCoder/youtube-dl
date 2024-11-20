export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
}

export type VideoResolution = 1080 | 720 | 480 | 360 | 240 | 144;
