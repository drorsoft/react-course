export const IceCreamTaste = {
    Chocolate: "Chocolate",
    Vanilla: "Vanilla",
    Strawberry: "Strawberry"
} as const;

export type IceCreamTaste = typeof IceCreamTaste[keyof typeof IceCreamTaste];