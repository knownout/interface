/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { ForwardedRef, forwardRef, memo, useCallback, useState } from "react";
import kwtClassNames from "../utils/kwt-ui";

type T = HTMLDivElement;

interface ICheckboxProps
{
    // Function, element(s) or string
    children: ((checked: boolean) => JSX.Element | JSX.Element[]) | JSX.Element[] | JSX.Element | string;

    // If true, will be checked by default
    defaultChecked?: boolean;

    disabled?: boolean;

    // Fires when checked state changes (will not be fired when disabled)
    onClick? (checked: boolean, target: T, event: React.MouseEvent<T>): void;
}

/**
 * React Checkbox component is the box that are checked
 * (ticked) when activated, like you might see
 * in an official government paper form.
 * @constructor
 */
export default memo(forwardRef((props: ICheckboxProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [ checked, setChecked ] = useState(Boolean(props.defaultChecked));

    // Update state on click
    const onComponentClick = useCallback((event: React.MouseEvent<T>) => setChecked(checked => {
        if (props.disabled) return checked;

        props.onClick && props.onClick(!checked, event.target as T, event);
        return !checked;
    }), [ props.onClick ]);

    const checkboxClassName = kwtClassNames("checkbox", { checked, disabled: props.disabled });
    return <div className={ checkboxClassName } onClick={ onComponentClick } ref={ ref }>
        { typeof props.children === "function" ? props.children(checked) : props.children }
    </div>;
}));
