import * as React from "react";
import {ReactNode} from "react";
import {cn} from "../bem";
import {Color, Colors} from "../../cards/cards/cards";
import {StdMeasureWeights} from "../../cards/measures/standard";
import {Select} from "./cmp-select";
import {DrawProfile} from "../../cards/draw-methods/draw-methods";
import {CmpObjectEditor} from "./cmp-object-editor";
import store = require("store");
import _ = require("lodash");
import {_package} from "../../index";

const defaults = require("../../../content/data.yaml");

export interface CmpDrawActionState extends DrawInfo {
    editor: string;
}

export interface DrawInfo {
    profiles: DrawProfile[];
    selProfile: DrawProfile;
    color: Color;
    weights: StdMeasureWeights;
}

const baseDrawInfo: DrawInfo = _.assign({}, defaults, {
    selProfile: defaults.profiles[0],
    color: "Red",
});

const drawStorage = store.namespace(`drawActions-${_package.version.replace(/\./g, "_")}`);
let initDraw = drawStorage.get("saved");
if (!initDraw) {
    initDraw = drawStorage.set("saved", baseDrawInfo);
}

export interface CmpDrawActionProps {
    onDraw: (profile: DrawInfo) => void;
}

export class CmpDrawAction extends React.Component<CmpDrawActionProps, CmpDrawActionState> {

    constructor(props: CmpDrawActionProps) {
        super(props);
        this.state = _.clone(initDraw);
    }

    onClick() {
        this.props.onDraw(this.state);
    }

    setStateFromEditor(newState: Partial<CmpDrawActionState>) {
        if (newState.profiles) {
            newState.selProfile = newState.profiles.find(x => x.name === this.state.selProfile.name);
            newState.editor = null;
        }
        super.setState(newState as any, () => {
            drawStorage.set("saved", _.omit(this.state, "editor"));
        });
    }

    private _showEditor(show: string) {
        this.setState({editor: show});
    }

    private _getEditor() {
        return <CmpObjectEditor
            initialValue={_.omit(this.state, "editor", "selProfile", "color")}
            title="Edit draw settings"
            onSave={c => this.setStateFromEditor(c)}
            onCancel={() => this._showEditor(null)}
            original={defaults}
        />;
    }

    render() {
        let cls = cn("draw-action");
        let {props, state} = this;

        let editor: ReactNode;

        switch (state.editor) {
            case "weights":
                editor = this._getEditor();
                break;
            default:
                editor = null;
                break;
        }

        return <div className={cls()}>
            {editor}
            <div className={cls("inputs")}>
                <Select
                    options={this.state.profiles}
                    selected={this.state.selProfile}
                    display={x => x.name}
                    className="select-profile"
                    onSelect={x => this.setState({selProfile: x})}
                    title="Profile"
                />
                <Select
                    options={Colors}
                    selected={this.state.color}
                    display={x => x}
                    className="select-color"
                    onSelect={x => this.setState({color: x})}
                    title="Color"
                />
                <button className={cls("edit-button")}
                    onClick={() => this._showEditor("weights")}>
                    Edit
                </button>
            </div>
            <div className={cls("button-box")}>
                <button className={cls("button")}
                    onClick={() => this.onClick()}>
                    Draw!
                </button>
            </div>
        </div>;
    }
}
