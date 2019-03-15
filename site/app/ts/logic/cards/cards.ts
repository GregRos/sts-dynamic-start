
// For color ⟹ Red | Green | Blue | Colorless | Curse
// For rarity ⟹ Basic | Common | Uncommon | Rare | Special | Curse
// For type ⟹ Attack | Skill | Power | Status | Curse
// For cost ⟹ 2 | 1 | 0 | 4 | 3 | X |  | 5
// For quality ⟹ Vulnerable. | Block. | Attack. | Weak. | Strength. | Exhaust.
// | HP. | Ethereal. | Exhausted. | Innate. | Poison. | Dexterity. |
// Unplayable. | Intangible. | Lightning. | Orb. | Frost. | Evoked. | On. |
// Orbs. | Focus. | Dark. | Energy. | Plasma. | Artifact. | Gold. | Curse. |

export type Color = "Red" | "Blue" | "Green" | "Colorless";

export const Colors: Color[] = ["Red", "Blue", "Green", "Colorless"];

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


