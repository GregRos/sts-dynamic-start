import * as React from "react";
import {cn} from "../bem";
import {Color, Colors} from "../../logic/cards/cards";
import {StdMeasureWeights} from "../../logic/measures/standard";
import {Select} from "./cmp-select";
import {DrawProfile} from "../../logic/draw-methods/draw-methods";
import {CmpObjectEditor} from "./cmp-object-editor";
import * as YAML from "yamljs";
import store = require("store");
import {ReactNode} from "react";

const defaultWeights = require("../../../content/weights.yaml");
const defaultProfiles = require("../../../content/profiles.yaml");

export interface DrawInfo {
    profiles: DrawProfile[];
    selProfile: DrawProfile;
    color: Color;
    weights: StdMeasureWeights;
}

const drawActions = store.namespace("drawActions");
let initWeights = drawActions.get("weights");
if (!initWeights) {
    initWeights = drawActions.set("weights", defaultWeights);
}

let initProfiles = drawActions.get("profiles");
if (!initProfiles) {
    initProfiles = drawActions.set("profiles", defaultProfiles);
}

export interface CmpDrawActionProps {
    onDraw: (profile: DrawInfo) => void;
}

export class CmpDrawAction extends React.Component<CmpDrawActionProps, DrawInfo & { editor: string }> {

    constructor(props: CmpDrawActionProps) {
        super(props);
        this.state = {
            color: Colors[0],
            weights: initWeights,
            profiles: initProfiles,
            editor: null,
            selProfile: initProfiles[0]
        };
    }

    onClick() {
        this.props.onDraw(this.state);
    }

    private _saveWeights(obj: any) {
        this.setState({
            weights: obj,
            editor: null
        });
    }

    private _saveProfiles(obj: DrawProfile[]) {
        let newlySelectedProfile = obj.find(x => x.name === this.state.selProfile.name);
        if (!newlySelectedProfile) {
            newlySelectedProfile = obj[0];
        }
        this.setState({
            profiles: obj,
            selProfile: newlySelectedProfile,
            editor: null
        })
    }

    private _showEditor(show: string) {
        this.setState({editor: show});
    }

    private _getWeightsEditor() {
        return <CmpObjectEditor
            initialValue={this.state.weights}
            title="Edit card weights"
            onSave={c => this._saveWeights(c)}
            onCancel={() => this._showEditor(null)}/>;
    }

    private _getProfilesEditor() {
        return <CmpObjectEditor
            initialValue={this.state.profiles}
            title="Edit draw profiles"
            onSave={c => this._saveProfiles(c)}
            onCancel={() => this._showEditor(null)}/>;
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
                    options={this.props.profiles}
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
                <button className={cls("edit-weights-button")}
                    onClick={() => this._showEditor(true)}>
                    Edit Weights
                </button>
                <button
                    className={cls("edit-profiles-button")}
                    onClick={() => }
                >

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
