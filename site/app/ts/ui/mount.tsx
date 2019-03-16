import * as ReactDOM from "react-dom";
import * as React from "react";
import {Categorizer, StdCategorizer} from "../cards/cards/categorizer";
import {Api} from "../api/api";
import {CmpLayoutRoot} from "./cmps/cmp-layout-root";
async function run() {
    let cards = await Api.getCardData();
    ReactDOM.render(<CmpLayoutRoot cards={cards}/>, document.getElementById("root"))
}

run();
