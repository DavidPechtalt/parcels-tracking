export const parcelLocationsArr = [
  "Reception desk",
  "Parcel locker #1",
  "Parcel locker #2",
  "Parcel locker #3",
  "Shelf A",
  "Shelf B",
  "Shelf C",
  "Corner near the elevator",
  "Behind the reception counter",
  "Table near the entrance",
  "Storage room",
  "Bench in the waiting area",
  "Security desk",
] as const;

export type ParcelLocation = (typeof parcelLocationsArr)[number];

export function isParcelLocation(
  stringToCheck: string
): stringToCheck is ParcelLocation {
  return (
    parcelLocationsArr.find((location) => location === stringToCheck) !==
    undefined
  );
}
