import {StdCategorizer} from "../cards/cards/categorizer";
import {EnhancedCard} from "../cards/cards/cards";
const cardData = require("../../content/items.json");
const std = new StdCategorizer();
export module Api {
    export async function getCardData() {
        let json = cardData;

        let cards = json.cards as EnhancedCard[];
        for (let card of cards) {
            card.categories = std.categorize(card);
            card.upgraded = card.name.endsWith("+")
        }
        return cards;
    }

    export function getImageUrl(name: string) {
        let processed = name.replace(/ /g, '').replace(/\+/g, "Plus")
        let providerUrl = `https://res.cloudinary.com/gregros/image/upload/v1552668544/sts/${processed}.png`;
        return providerUrl;
    }
}
