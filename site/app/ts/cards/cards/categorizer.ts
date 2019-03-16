import {Category, EnhancedCard, GameCard} from "./cards";

export interface Categorizer {
    categorize(card: GameCard): Category[];
}

const overrides = new Map<string, Category[]>();
const blockLikeRegex = /\d+ Block/;
export class StdCategorizer implements Categorizer{
    categorize(card: GameCard) : Category[] {
        let cat = overrides.get(card.name);
        if (cat) return cat;
        switch (card.type) {
            case "Curse":
                return ["Curse"];
            case "Power":
                return ["Special"];
            case "Attack":
                return ["Offense"];
            case "Skill":
                if (card.description.match(blockLikeRegex)) {
                    return ["Defense"]
                } else {
                    return ["Special"]
                }
            case "Status":
            default:
                return ["Other"];
        }
    }
}
