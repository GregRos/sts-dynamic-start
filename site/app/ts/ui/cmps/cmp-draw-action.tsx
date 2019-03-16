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

const defaultWeights = require("../../../content/weights.yaml");
const defaultProfiles = require("../../../content/profiles.yaml");

export interface CmpDrawActionState extends DrawInfo {
    editor: string;
}

export interface DrawInfo {
    profiles: DrawProfile[];
    selProfile: DrawProfile;
    color: Color;
    weights: StdMeasureWeights;
}

const defaultDrawInfo: DrawInfo = {
    profiles: defaultProfiles,
    selProfile: defaultProfiles[0],
    color: "Red",
    weights: defaultWeights
};

const drawActions = store.namespace("drawActions");
let initDraw = drawActions.get("saved");
if (!initDraw) {
    initDraw = drawActions.set("saved", defaultDrawInfo);
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

    private _saveWeights(obj: any) {
        this.setAndSaveState({
            weights: obj,
            editor: null
        });
    }

    setAndSaveState(x: Partial<CmpDrawActionState>) {

        super.setState(x as any, () => {
            drawActions.set("saved", _.omit(this.state, "editor"));
        });
    }

    private _saveProfiles(obj: DrawProfile[]) {
        let newlySelectedProfile = obj.find(
            x => x.name === this.state.selProfile.name);
        if (!newlySelectedProfile) {
            newlySelectedProfile = obj[0];
        }
        this.setAndSaveState({
            profiles: obj,
            selProfile: newlySelectedProfile,
            editor: null
        });
    }

    private _showEditor(show: string) {
        this.setAndSaveState({editor: show});
    }

    private _getWeightsEditor() {
        return <CmpObjectEditor
            initialValue={this.state.weights}
            title="Edit card weights"
            onSave={c => this._saveWeights(c)}
            onCancel={() => this._showEditor(null)}
            original={defaultWeights}
        />;
    }

    private _getProfilesEditor() {
        return <CmpObjectEditor
            initialValue={this.state.profiles}
            title="Edit draw profiles"
            onSave={c => this._saveProfiles(c)}
            onCancel={() => this._showEditor(null)}
            original={defaultProfiles}
        />;
    }

    render() {
        let cls = cn("draw-action");
        let {props, state} = this;

        let editor: ReactNode;

        switch (state.editor) {
            case "weights":
                editor = this._getWeightsEditor();
                break;
            case "profiles":
                editor = this._getProfilesEditor();
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
                    onSelect={x => this.setAndSaveState({selProfile: x})}
                    title="Profile"
                />
                <Select
                    options={Colors}
                    selected={this.state.color}
                    display={x => x}
                    className="select-color"
                    onSelect={x => this.setAndSaveState({color: x})}
                    title="Color"
                />
                <button className={cls("edit-weights-button")}
                    onClick={() => this._showEditor("weights")}>
                    Edit Weights
                </button>
                <button
                    className={cls("edit-profiles-button")}
                    onClick={() => this._showEditor("profiles")}>
                    Edit Profiles
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
