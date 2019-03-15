import * as React from "react";
import {cn} from "../bem";
import {ChangeEvent} from "react";

export interface SelectProps<T> {
    options: T[];
    selected: T;
    display: (x: T) => string;
    onSelect(x: T): void;
    className: string;
    title: string;
}

export class Select<T> extends React.Component<SelectProps<T>> {

    onSelect(x: ChangeEvent<HTMLSelectElement>) {
        let newSelected = this.props.options[+x.target.value];
        this.props.onSelect(newSelected);
    }

    render() {
        let customNs = cn(this.props.className);
        let genericNs = cn("select");
        let options = this.props.options.map((x, i) => {
            return <option
                value={i}
                key={i}c
                className={`${customNs("option")} ${genericNs("option")}`}
            >
                {this.props.display(x)}
            </option>
        });
        let selectBox = <div className={`${customNs()} ${genericNs()}`}>
            <label className="select__label">{this.props.title}</label>
            <select className={`${customNs("input")} ${genericNs("input")}`} onChange={x => this.onSelect(x)}>
                {options}
            </select>
        </div>;

        return selectBox;
    }
}
