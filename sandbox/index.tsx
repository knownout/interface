import React from "react";
import ReactDOM from "react-dom";
import Button from "../package/components/Button";

import "./styles.scss";
import Input from "../package/components/Input";
import Checkbox from "../package/components/Checkbox";
import RadioGroup from "../package/components/RadioGroup";

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
        <RadioGroup allowUncheck={ true }>
            <RadioGroup.Button>Hello</RadioGroup.Button>
            <RadioGroup.Button>World</RadioGroup.Button>
        </RadioGroup>
    </>;
}

ReactDOM.render(<App />, document.querySelector("#app-root"));
