import {Color, EnhancedCard} from "../cards/cards";
import _ = require("lodash");

export class Cdf<T> {
    private _cdf: number[];

    constructor(private _objects: T[], private _measure: (x: T) => number) {
        this._calcCdf();
    }

    private _calcCdf() {
        let cdf = this._cdf = [];
        for (let obj of this._objects) {
            cdf.push((_.last(cdf) || 0) + this._measure(obj));
        }
    }

    random(): T;
    random(x: number): T[];
    random(x?: number) {
        if (typeof x !== "number") {
            let random = Math.random() * _.last(this._cdf);
            for (let i = 0; i < this._cdf.length; i++) {
                if (this._cdf[i] > random) return this._objects[i];
            }
        } else {
            return _.range(0, x).map(() => this.random());
        }
    }
}
