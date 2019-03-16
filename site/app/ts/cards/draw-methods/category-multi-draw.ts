import {Color, EnhancedCard} from "../cards/cards";
import {CardDraw} from "../../ui/cmps/cmp-card-collection";
import {Cdf} from "./cdf";
import {DrawProfile} from "./draw-methods";

export class CategoryMultiDraw {
    private _offense: Cdf<EnhancedCard>;
    private _defense: Cdf<EnhancedCard>;
    private _special: Cdf<EnhancedCard>;
    private _curse: Cdf<EnhancedCard>;
    constructor(
        private _cards: EnhancedCard[],
        private _draw: (cards: EnhancedCard[]) => Cdf<EnhancedCard>,
        private _profile: DrawProfile
    ) {
        this._offense = _draw(_cards.filter(x => x.categories.includes("Offense")));
        this._defense = _draw(_cards.filter(x => x.categories.includes("Defense")));
        this._special = _draw(_cards.filter(x => x.categories.includes("Special")));
        this._curse = _draw(_cards.filter(x => x.categories.includes("Curse")));
    }

    draw() {
        return [
            {
                title: "Offense",
                cards: this._offense.random(this._profile.offense)
            },
            {
                title: "Defense",
                cards: this._defense.random(this._profile.defense)
            },
            {
                title: "Special",
                cards: this._special.random(this._profile.special)
            }
        ] as CardDraw[]
    }
}
