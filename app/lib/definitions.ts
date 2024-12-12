import { Dispatch, SetStateAction } from "react";

export type Dam = {
  name: string;
  longitude: number;
  latitude: number;
};

export type DamContextType = {
  currentDam: Dam;
  setCurrentDam: Dispatch<SetStateAction<Dam>>;
};

export type Crop = {
  id: string;
  area: number;
  crop: string;
  irrigationMethod: string;
  croppingPattern: string;
};
