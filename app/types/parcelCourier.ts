export const parcelCourierArr = [
  "Amazon",
  "Ebay",
  "FedEx",
  "UPS",
  "DHL",
  "AliExpress",
  "USPS",
  "Hermes",
  "Yodel",
  "Royal Mail",
  "Canada Post",
  "Australia Post",
  "Aramex",
  "TNT",
  "GLS",
  "Blue Dart",
  "China Post",
  "Japan Post",
  "India Post",
  "La Poste",
] as const;
export type ParcelCourier = (typeof parcelCourierArr)[number];

export function isParcelCourier(
  stringToCheck: string
): stringToCheck is ParcelCourier {
  return (
    parcelCourierArr.find((courier) => courier === stringToCheck) !== undefined
  );
}
