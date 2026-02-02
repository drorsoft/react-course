export const ServingType = {
  Cup: "cup",
  Cone: "cone",
} as const;

export type ServingType = typeof ServingType[keyof typeof ServingType];
