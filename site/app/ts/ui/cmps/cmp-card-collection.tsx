import * as React from "react";
import {CmpCardImage} from "./cmp-card-image";
import {cn} from "../bem";
import {GameCard} from "../../logic/cards/cards";

export interface CardDraw {
    title: string;
    cards: GameCard[]
}

export class CmpCardCollection extends React.Component<CardDraw> {
    constructor(props) {
        super(props);
    }

    render() {
        let cls = cn("card-collection");
        let cards = this.props.cards.map((card, i) => <CmpCardImage {...card} key={i}/>);
        return <div className={cls()}>
            <div className={cls("title")}>
                {this.props.title}
            </div>
            <div className={cls("collection")}>
                {cards}
            </div>
        </div>;
    }
}
