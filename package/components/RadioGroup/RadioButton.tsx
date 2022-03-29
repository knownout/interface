/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { forwardRef, memo, useCallback, useContext } from "react";
import { ICommonProps, kwtClassNames } from "../utils";
import { RadioGroupContext } from "./RadioGroup";

type T = HTMLButtonElement;

interface IRadioButtonProps extends ICommonProps
{
    icon?: JSX.Element;

    // Button label
    children: string;

    // Fires when button get clicked
    onClick? (checked: boolean, target: T, event: React.MouseEvent<T>): void;
}

/**
 * React RadioButton component for creating radio buttons
 * (can be created only inside RadioGroup component).
 */
export default memo(forwardRef((props: IRadioButtonProps, ref: React.ForwardedRef<T>) => {
    const { selected, updateSelected } = useContext(RadioGroupContext);
    const radioButtonClassName = kwtClassNames("radio-button", props.className, {
        selected: selected == props.children, disabled: props.disabled
    });

    // If not inside RadioGroup context, show warning.
    if (!updateSelected) return null;

    const onComponentClick = useCallback((event: React.MouseEvent<T>) => updateSelected(selected => {
        const nextState = selected == props.children ? null : props.children;

        props.onClick && props.onClick(Boolean(nextState), event.target as T, event);
        return nextState;
    }), [ props.children ]);

    return <button onClick={ onComponentClick } className={ radioButtonClassName } ref={ ref }>
        { props.icon && <div className="icon-holder" children={ props.icon } /> }
        { props.children }
    </button>;
}));
