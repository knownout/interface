import React from "react";
import ReactDOM from "react-dom";
import Button from "../package/components/Button";

import "./styles.scss";
import Input from "../package/components/Input";
import Checkbox from "../package/components/Checkbox";

function App () {
    return <>
        <h1>React component library @knownout/interface</h1>
        <Button>Hello world</Button>
        <Input placeholder="Hello world" />
        <Checkbox>
            { checked => {
                return <span>{ checked ? "Not he he" : "He he?" }</span>;
            } }
        </Checkbox>
    </>;
}

ReactDOM.render(<App />, document.querySelector("#app-root"));
