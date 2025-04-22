import { IceCreamTaste } from "../models/IceCreamTaste";
import { IceCreamTopping } from "../models/IceCreamTopping";

const flavorTextFromFlavour = (flavor) => {
    switch (flavor) {
        case IceCreamTaste.Chocolate:
            return "שוקולד";
        case IceCreamTaste.Vanilla:
            return "וניל";
        case IceCreamTaste.Strawberry:
            return "תות";
        default:
            throw new Error(`Unknown flavor: ${flavor}`);
    }
}

const toppingsTextFromToppings = (toppings) => {
    switch (toppings) {
        case IceCreamTopping.Cherry:
            return "דובדבן ";
        case IceCreamTopping.Sprinkles:
            return "סוכריות ";
        case IceCreamTopping.None:
        default:
            return "ללא תוספות";
    }
}

export const iceCreamAbstract = (iceCream) => {
    const { taste, toppings, serveType } = iceCream;

    const flavorText = flavorTextFromFlavour(taste)
    const toppingsText = toppingsTextFromToppings(toppings);
    const serveTypeText = serveType === "cone" ? "גביע" : "כוס";
    return `כדור בטעם ${flavorText},   ${toppingsText},  ב${serveTypeText}`;
};