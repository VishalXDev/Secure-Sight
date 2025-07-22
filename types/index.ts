export type Camera = {
  id: string;
  name: string;
  location: string;
};

export interface Incident {
  id: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnail: string;
  videoUrl: string;
  confidence: number;
  camera?: {
    id: string;
    location: string;
  };
  duration: number;
}
