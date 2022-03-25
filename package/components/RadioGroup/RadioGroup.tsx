/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { forwardRef, memo, useState } from "react";
import { ICommonProps, kwtClassNames, TDispatcher } from "utils";

interface IRadioGroupContext
{
    // Current selected item key (text).
    selected: string | null;

    // Update selected item.
    setSelected (dispatch: TDispatcher<IRadioGroupContext["selected"]>): void;
}

/**
 * Storage for selected item and update dispatcher.
 * @type {React.Context<Partial<IRadioGroupContext>>}
 */
export const RadioGroupContext = React.createContext<Partial<IRadioGroupContext>>({});

interface IRadioGroupProps extends ICommonProps
{
    // RadioButton components.
    children: JSX.Element | JSX.Element[];

    // Allow unchecking selected radio buttons.
    allowUncheck?: boolean;

    // Fires when radio button get clicked.
    onSelectionChange? (selected: IRadioGroupContext["selected"]): void;
}

/**
 * React RadioGroup component to create a
 * wrapper for RadioButton components
 */
export default memo(forwardRef((props: IRadioGroupProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [ selected, setSelected ] = useState<IRadioGroupContext["selected"]>(null);

    const { disabled } = props;
    const radioGroupClassName = kwtClassNames("radio-group", props.className, { disabled });

    // Add-on over setSelected function to provide extra functionality.
    const updateSelection = (dispatch: TDispatcher<IRadioGroupContext["selected"]>) => setSelected(selected => {
        props.onSelectionChange && props.onSelectionChange(selected);
        const nextState = dispatch(selected);

        // Reject null if uncheck not allowed
        if (!props.allowUncheck && nextState === null) return selected;
        return nextState;
    });

    return <div className={ radioGroupClassName } ref={ ref }>
        <RadioGroupContext.Provider value={ { selected, setSelected: updateSelection } }>
            { props.children }
        </RadioGroupContext.Provider>
    </div>;
}));
