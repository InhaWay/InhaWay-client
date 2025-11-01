export interface Building {
  _id: string;
  name: string;
  code: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}