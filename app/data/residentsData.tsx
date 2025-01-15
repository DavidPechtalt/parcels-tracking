import { Resident } from "~/types/resident";
import data from "./residents.json";

const residentsData = data as Resident[];
export default residentsData;

export function getResidents(name?: string) {
  if (!name) {
    return residentsData;
  }
  return [residentsData.find((resident) => resident.name.includes(name))];
}

export function getResidentById(id:string){
    return residentsData.find(resident => resident.id === id)
}
export function getResidentByName(name:string){
    return residentsData.find(resident => resident.name === name)
}
