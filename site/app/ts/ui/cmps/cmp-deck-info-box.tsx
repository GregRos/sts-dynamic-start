import * as React from "react";
import {cn} from "../bem";
import * as _ from "lodash";
export interface DrawInfoBoxProps {
    info: Record<string, string>;
}

export class CmpDeckInfoBox extends React.Component<DrawInfoBoxProps> {
    render() {
        let root = cn("deck-info-box");
        let headings = _.map(this.props.info, (v, k) => {
            return <div className={root("row")} key={k}>
                <span className={root("heading")}>
                    {k}
                </span>
                <span className={root("value")}>
                    {v}
                </span>
            </div>
        });

        return <div className={root()}>
            {headings}
        </div>
    }
}
