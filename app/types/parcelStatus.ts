export const parcelStatusArr = ["pending", "taken"] as const;
export type ParcelStatus = (typeof parcelStatusArr)[number];
