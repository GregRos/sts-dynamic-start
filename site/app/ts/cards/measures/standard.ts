import {Color, EnhancedCard} from "../cards/cards";
import {MessageChannel} from "worker_threads";

export interface StdMeasureWeights {
    color: {
        colorless: number;
        same: number;
        other: number;
    };
    upgraded: {
        yes: number;
        no: number;
    };
    rarity: {
        Basic: number;
        Common: number;
        Uncommon: number;
        Rare: number;
        Special: number;
        Curse: number;
    };
}


export class StdWeightedMeasure {
    constructor(private _color: Color, private _weights: StdMeasureWeights) {

    }

    measure(card: EnhancedCard) {
        let weights = this._weights;
        let wgColor = weights.color[card.color === this._color ? "same" : card.color === "Colorless" ? "colorless": "other"];
        let wgUpgraded = weights.upgraded[card.upgraded ? "yes" : "no"];
        let wgRarity = weights.rarity[card.rarity];
        let res = wgColor * wgUpgraded * wgRarity;
        return res;
    }
}

