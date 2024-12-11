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
