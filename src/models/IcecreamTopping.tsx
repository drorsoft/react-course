export const IceCreamTopping = {
    None: "None",
    Cherry: "Cherry",
    Sprinkles: "Sprinkles"
} as const;

export type IceCreamTopping = typeof IceCreamTopping[keyof typeof IceCreamTopping];