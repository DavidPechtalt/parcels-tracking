export const parcelStatusArr = ["pending", "picked up"] as const;
export type ParcelStatus = (typeof parcelStatusArr)[number];
