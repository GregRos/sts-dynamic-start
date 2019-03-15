import {Color, EnhancedCard} from "../cards/cards";
import {MessageChannel} from "worker_threads";

export interface StdMeasureWeights {
    Color: {
        Colorless: number;
        Same: number;
        Other: number;
    };
    Upgraded: {
        yes: number;
        no: number;
    };
    Rarity: {
        Basic: number;
        Common: number;
        Uncommon: number;
        Rare: number;
        Special: number;
        Curse: number;
    };
    Cost: {
        0: number;
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        X: number;
        "": number;
    }
}


export class StdWeightedMeasure {
    constructor(private _color: Color, private _weights: StdMeasureWeights) {

    }

    measure(card: EnhancedCard) {
        let weights = this._weights;
        let wgColor = weights.Color[card.color === this._color ? "Same" : card.color === "Colorless" ? card.color : "Other"];
        let wgUpgraded = weights.Upgraded[card.upgraded ? "Yes" : "No"];
        let wgRarity = weights.Rarity[card.rarity];
        let wgEnergy = 1;
        let res = wgColor * wgUpgraded * wgRarity * wgEnergy;
        return res;
    }
}

