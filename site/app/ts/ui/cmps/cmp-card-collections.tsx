import * as React from "react";
import {CmpCardCollection, CardDraw} from "./cmp-card-collection";
import {cn} from "../bem";

export interface CmpCardCollectionsProps {
    collections: CardDraw[];
}

export class CmpCardCollections extends React.Component<CmpCardCollectionsProps> {
    render() {
        let cls = cn("card-collections");
        return <div className={cls()}>
            {this.props.collections.map(x => <CmpCardCollection {...x}/>)}
        </div>;
    }
}
