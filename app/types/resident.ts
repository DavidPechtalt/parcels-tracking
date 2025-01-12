import { ResidentProfileImg } from "./residnetProfileImg";
import { Unit } from "./unit";

export interface Resident {
  id: string;
  name: string;
  unit: Unit;
  img: ResidentProfileImg;
}
