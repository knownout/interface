/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { forwardRef, memo, useCallback, useState } from "react";
import { ICommonProps, kwtClassNames, TDispatcher } from "../utils";

type T = HTMLDivElement;
type TAccordionDispatcher = TDispatcher<IAccordionContext["openItems"]>;

interface IAccordionContext
{
    // Open items list.
    openItems: string[];

    // Update open items list.
    updateOpenItems (dispatch: TAccordionDispatcher): void;
}

/**
 * Storage for opened items list and update dispatcher.
 * @type {React.Context<Partial<IRadioGroupContext>>}
 */
export const AccordionContext = React.createContext<Partial<IAccordionContext>>({});

interface IAccordionProps extends ICommonProps
{
    // Accordion items.
    children: JSX.Element | JSX.Element[];

    // Index of specific accordion item to open by default.
    defaultOpen?: number;

    // Allow open more than one item at time.
    allowMultiple?: boolean;

    // Fires when open elements list changed.
    onOpenElementsChange? (openElements: string[]): void;
}

/**
 * React AccordionComponent component to create a
 * wrapper for AccordionItem components
 */
export default memo(forwardRef((props: IAccordionProps, ref: React.ForwardedRef<T>) => {
    const defaultOpenedItems = props.defaultOpen ? [ props.children ].flat()
        .filter((e, i) => i == props.defaultOpen)
        .map(e => e.props.title) : [];

    const [ openItems, setOpenItems ] = useState<string[]>([ ...defaultOpenedItems ]);

    // Add-on over state update function to provide extra functionality
    const updateOpenItems = useCallback((dispatch: (TAccordionDispatcher)) => setOpenItems(openItems => {
        let nextState = dispatch(openItems);

        // Check if multiple open items allowed
        if (!props.allowMultiple) nextState = nextState.slice(-1);

        setTimeout(() => props.onOpenElementsChange && props.onOpenElementsChange(nextState));
        return nextState;
    }), [ props.allowMultiple, props.onOpenElementsChange ]);

    const { disabled, className } = props;

    const accordionClassName = kwtClassNames("accordion", className, { disabled });
    return <div className={ accordionClassName } ref={ ref }>
        <AccordionContext.Provider value={ { openItems, updateOpenItems } }>
            { props.children }
        </AccordionContext.Provider>
    </div>;
}));
