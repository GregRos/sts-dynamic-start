import * as React from "react";
import {EnhancedCard} from "../../cards/cards/cards";
import {cn} from "../bem";
import {CmpDrawAction, DrawInfo} from "./cmp-draw-action";
import {CmpDeckInfoBox} from "./cmp-deck-info-box";
import {CmpCardCollections} from "./cmp-card-collections";
import {CardDraw} from "./cmp-card-collection";
import {CategoryMultiDraw} from "../../cards/draw-methods/category-multi-draw";
import {Cdf} from "../../cards/draw-methods/cdf";
import {StdWeightedMeasure} from "../../cards/measures/standard";
import {DrawProfile} from "../../cards/draw-methods/draw-methods";
import * as YAML from "yamljs";

export interface LayourRootProps {
    cards: EnhancedCard[];
}


export interface LayoutRootState {
    current: CardDraw[];
}

export class CmpLayoutRoot extends React.Component<LayourRootProps, LayoutRootState> {

    constructor(props: LayourRootProps) {
        super(props);
        this.state = {
            current: []
        };
    }


    private _onDraw(profile: DrawInfo) {
        let measure = new StdWeightedMeasure(profile.color, profile.weights);
        let method = new CategoryMultiDraw(this.props.cards,
            xs => new Cdf(xs, x => measure.measure(x)), profile.selProfile
        );
        this.setState({
            current: method.draw()
        });
    }

    render() {
        let cls = cn("container");
        return <div className={cls()}>
            <div className={cls("actions")}>
                <CmpDrawAction onDraw={x => this._onDraw(x)} />
            </div>
            <div className={cls("info")}>
                <CmpDeckInfoBox info={{}}/>
            </div>
            <div className={cls("cards")}>
                <CmpCardCollections collections={this.state.current}/>
            </div>
        </div>;
    }
}


