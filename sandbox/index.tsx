import React from "react";
import ReactDOM from "react-dom";
import Button from "../package/components/Button";

import "./styles.scss";
import Input from "../package/components/Input";

function App () {
    return <>
        <h1>React component library @knownout/interface</h1>
        <Button>Hello world</Button>
        <Input />
    </>;
}

ReactDOM.render(<App />, document.querySelector("#app-root"));
