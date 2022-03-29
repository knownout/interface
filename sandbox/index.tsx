import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

import Button from "../package/components/Button";
import Input from "../package/components/Input";
import Checkbox from "../package/components/Checkbox";
import RadioGroup from "../package/components/RadioGroup";
import Accordion from "../package/components/Accordion";
import Dropdown from "../package/components/Dropdown";

function App () {
    return <>
        <h1>React component library @knownout/interface</h1>
        <Button>Hello world</Button>
        <Input placeholder="Hello world" />
        <Checkbox customStatesList={ [ "first", "second", null ] }>
            { checked => {
                return <span>{ checked ? "Not he he" : "He he?" }</span>;
            } }
        </Checkbox>
        <RadioGroup allowUncheck={ true }>
            <RadioGroup.Button>Hello</RadioGroup.Button>
            <RadioGroup.Button>World</RadioGroup.Button>
        </RadioGroup>

        <Accordion allowMultiple={ false } onOpenElementsChange={ console.log }>
            <Accordion.Item title="First">
                Hello world
            </Accordion.Item>
            <Accordion.Item title="Second">
                Hello world
            </Accordion.Item>
        </Accordion>

        <Dropdown defaultTitle="Select something...">
            <Dropdown.Item>Hello</Dropdown.Item>
            <Dropdown.Item>World</Dropdown.Item>
        </Dropdown>
    </>;
}

ReactDOM.render(<App />, document.querySelector("#app-root"));
