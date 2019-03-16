import ReactDOM = require("react-dom");
import CodeEditor from "react-simple-code-editor";
import * as React from "react";
import {highlight, languages} from "prismjs/components/prism-core";
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-yaml'
import {cn} from "../bem";
import * as YAML from "js-yaml";

export interface CmpObjectEditorProps {
    initialValue: object;
    onSave: (x: any) => void;
    onCancel: () => void;
    title: string;
    original: object;
}

export interface CmpObjectEditorState {
    content: string;
}

export class CmpObjectEditor extends React.Component<CmpObjectEditorProps, CmpObjectEditorState> {

    constructor(props: CmpObjectEditorProps) {
        super(props);
        this.state = {
            content: YAML.dump(props.initialValue)
        };
    }

    private _save() {
        try {
            this.props.onSave(YAML.load(this.state.content))
        }
        catch (err) {
            alert(`ERROR: ${err.message}`);
        }
    }

    private _default() {
        this.setState({
            content: YAML.dump(this.props.original,)
        })
    }

    render() {
        const ns = cn("code-editor");
        let codeEditor = <div className={ns()}>
            <div className={ns("title")}>
                {this.props.title}
            </div>
            <CodeEditor
                className={ns("editor")}
                value={this.state.content}
                onValueChange={x => this.setState({content: x})}
                highlight={code => highlight(code,
                    languages["yaml"]
                )}/>
            <div className={ns("controls")}>
                <button className={ns("save")} onClick={() => this._save()}>
                    Save
                </button>
                <button className={ns("cancel")} onClick={this.props.onCancel}>
                    Cancel
                </button>
                <button className={ns("default")} onClick={() => this._default()}>
                    Restore Defaults
                </button>
            </div>
        </div>;

        return ReactDOM.createPortal(codeEditor,
            document.getElementById("editor-portal")
        );
    }
}
