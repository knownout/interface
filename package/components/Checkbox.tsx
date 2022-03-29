/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { ForwardedRef, forwardRef, memo, useCallback, useState } from "react";
import { ICommonProps, kwtClassNames } from "./utils";

type T = HTMLDivElement;

interface ICheckboxProps extends ICommonProps
{
    // Function, element(s) or string
    children: ((checked: string | null) => JSX.Element | JSX.Element[]) | JSX.Element[] | JSX.Element | string;

    // If true, will be checked by default
    defaultChecked?: boolean;

    customStatesList?: (string | null)[];

    // Fires when checked state changes (will not be fired when disabled)
    onClick? (checked: string | null, target: T, event: React.MouseEvent<T>): void;
}

/**
 * React Checkbox component is the box that are checked
 * (ticked) when activated, like you might see
 * in an official government paper form.
 *
 * _Component can use multiple states, which
 * change after click_
 */
export default memo(forwardRef((props: ICheckboxProps, ref: ForwardedRef<HTMLDivElement>) => {
    const statesList = props.customStatesList || [ "checked", null ];

    const [ checked, setChecked ] = useState(props.defaultChecked ? statesList[0] as string : null);

    if (statesList.length < 2) return null;

    // Update state on click
    const onComponentClick = useCallback((event: React.MouseEvent<T>) => setChecked(checked => {
        if (props.disabled) return checked;

        const nextStateIndex = statesList.indexOf(checked) + 1;
        const nextState = nextStateIndex >= statesList.length ? 0 : nextStateIndex;

        props.onClick && props.onClick(checked, event.target as T, event);
        return statesList[nextState] as string;
    }), [ props.onClick ]);

    const checkboxClassName = kwtClassNames("checkbox", checked, { disabled: props.disabled });
    return <div className={ checkboxClassName } onClick={ onComponentClick } ref={ ref }>
        { typeof props.children === "function" ? props.children(checked) : props.children }
    </div>;
}));
