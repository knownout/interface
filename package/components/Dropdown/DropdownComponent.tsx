/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { forwardRef, memo, useCallback, useEffect, useState } from "react";
import { ICommonProps, kwtClassNames, TDispatcher } from "../utils";

interface IDropdownContext
{
    selected: string | null;

    // Update selected item.
    updateSelected (dispatcher: TDispatcher<string | null>): void;
}

/**
 * Storage for selected items list and update dispatcher.
 * @type {React.Context<Partial<IRadioGroupContext>>}
 */
export const DropdownContext = React.createContext<Partial<IDropdownContext>>({});
type T = HTMLDivElement;

interface IDropdownProps extends ICommonProps
{
    children: JSX.Element | JSX.Element[];

    // Do not replace default title with selected item.
    staticTitle?: boolean;

    // Default dropdown title (when nothing selected).
    defaultTitle: string;

    // Allow to de-select selected items.
    allowUncheck?: boolean;

    // Default selected index of item.
    defaultSelected?: number;

    // Add an icon to dropdown title.
    icon?: JSX.Element;

    // Fires when selected item changes (even if unchecked).
    onSelectionChange? (selected: string | null): void;

    // Fires when dropdown title element get clicked.
    onTitleClick? (open: boolean, target: T, event: React.MouseEvent<T>): void;

    onOpenStateChange? (open: boolean): void;
}

/**
 * React DropdownComponent component to create a
 * selector with predefined items using DropdownItem components.
 */
export default memo(forwardRef((props: IDropdownProps, ref: React.ForwardedRef<T>) => {
    const defaultSelected = [ props.children ].flat()
            .filter((item, index) => index === props.defaultSelected)
            .map<string>(e => e.props.children)[0]
        || null;

    const [ selected, setSelected ] = useState(defaultSelected);
    const [ open, setOpen ] = useState(false);

    // Update state when default selected prop changed.
    useEffect(() => {
        const item = [ props.children ].flat()
            .filter((item, index) => index === props.defaultSelected)
            .map<string>(e => e.props.children)[0];

        if (item && item != selected) setSelected(item);
    }, [ props.defaultSelected ]);

    // Get common props as variables.
    const { disabled, className } = props;

    // Fire onTitleClick event and open/close dropdown when title element get clicked.
    const onTitleClick = useCallback((event: React.MouseEvent<T>) => setOpen(open => {
        if (disabled) return open;

        setTimeout(() => {
            props.onOpenStateChange && props.onOpenStateChange(!open);
            props.onTitleClick && props.onTitleClick(!open, event.target as T, event);
        });
        return !open;
    }), [ props.onTitleClick ]);

    // Update selected item state with dispatcher value (from item).
    const updateSelected = useCallback((dispatcher: TDispatcher<string | null>) => setSelected(state => {
        setOpen(false);
        props.onOpenStateChange && props.onOpenStateChange(false);

        if (disabled) return state;

        const nextState = dispatcher(state);
        if (nextState === null && !props.allowUncheck) return state;

        setTimeout(() => {
            props.onSelectionChange && props.onSelectionChange(nextState);
        });

        return nextState;
    }), []);

    // Component title text.
    const title = props.staticTitle ? props.defaultTitle : selected || props.defaultTitle;

    const dropdownClassName = kwtClassNames("dropdown", className, { open, disabled });
    return <div className={ dropdownClassName } ref={ ref }>
        <div className="title" onClick={ onTitleClick }>
            <span children={ title } />
            { props.icon && <div className="icon-holder" children={ props.icon } /> }
        </div>
        <div className="items">
            <DropdownContext.Provider value={ { selected, updateSelected } }>
                { props.children }
            </DropdownContext.Provider>
        </div>
    </div>;
}));
