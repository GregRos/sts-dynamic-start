import * as React from "react";
import {cn} from "../bem";
import {GameCard} from "../../cards/cards/cards";
import {Api} from "../../api/api";

export interface CmpCardImageState {
    loading: boolean;
}

export class CmpCardImage extends React.Component<GameCard, CmpCardImageState> {
    constructor(props, ctx) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentWillReceiveProps(
        nextProps: Readonly<GameCard>, nextContext: any): void {
        if (nextProps.name !== this.props.name) {
            this.setState({
                loading: true
            })
        }
    }

    private _imageLoaded() {
        this.setState({
            loading: false
        });
    }

    render(): React.ReactNode {
        let root = cn("card-image");
        return <div className={root()}>
            <div className={root("frame")}>
                <img
                    className={root("image")}
                    src={Api.getImageUrl(this.props.name)}
                    alt={this.props.description}
                    style={{opacity: this.state.loading ? 0 : 1}}
                    onLoad={x => this._imageLoaded()}
                />
            </div>
        </div>
    }
}
