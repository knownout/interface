import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

import Button from "../package/components/Button";
import Input from "../package/components/Input";
import Checkbox from "../package/components/Checkbox";
import { RadioButton, RadioGroup } from "../package/components/RadioGroup";
import { Accordion, AccordionItem } from "../package/components/Accordion";
import { Dropdown, DropdownItem } from "../package/components/Dropdown";

function App () {
    return <>
        <h1>React components library @knownout/interface</h1>
        <Button>Hello world</Button>
        <Input placeholder="Hello world" />
        <Checkbox customStatesList={ [ "first", "second", null ] }>
            { checked => {
                return <span>{ checked ? "Not he he" : "He he?" }</span>;
            } }
        </Checkbox>
        <RadioGroup allowUncheck={ true }>
            <RadioButton>Hello</RadioButton>
            <RadioButton>World</RadioButton>
        </RadioGroup>

        <Accordion allowMultiple={ false } onOpenElementsChange={ console.log }>
            <AccordionItem title="First">
                Hello world
            </AccordionItem>
            <AccordionItem title="Second">
                Hello world
            </AccordionItem>
        </Accordion>

        <Dropdown defaultTitle="Select something..." allowUncheck={ true } defaultSelected={ 0 }>
            <DropdownItem>Hello</DropdownItem>
            <DropdownItem>World</DropdownItem>
        </Dropdown>
    </>;
}

ReactDOM.render(<App />, document.querySelector("#app-root"));
