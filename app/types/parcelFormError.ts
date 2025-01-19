export const parcelFormErrorArr = [
  "input error",
  "courier error",
  "resident error",
  "location error",
] as const;

export type ParcelFormError = (typeof parcelFormErrorArr)[number];
