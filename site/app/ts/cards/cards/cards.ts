export type Color = "Red" | "Blue" | "Green" | "Colorless" | "Curse";

export const Colors: Color[] = ["Red", "Blue", "Green", "Colorless", "Curse"];

export type Rarity = "Basic" | "Common" | "Uncommon" | "Rare" | "Special" | "Curse";

export type CardType = "Attack" | "Skill" | "Power" | "Status" | "Curse";

export type CardCost = number | "X" | "?";

// Frail.
export interface GameCard {
    name: string;
    color: Color;
    rarity: Rarity
    type: CardType
    cost: CardCost;
    description: string;
}

export type Category =
    "Offense"
    | "Defense"
    | "Special"
    | "Curse"
    | "Other"

export interface EnhancedCard extends GameCard {
    upgraded: boolean;
    categories: Category[]
}


