/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import { ICommonProps, kwtClassNames, TDispatcher } from "utils";
import React, { forwardRef, memo, useCallback, useState } from "react";

interface IDropdownContext
{
    selected: string | null;

    updateSelected (dispatcher: TDispatcher<string | null>): void;
}

export const DropdownContext = React.createContext<Partial<IDropdownContext>>({});
type T = HTMLDivElement;

interface IDropdownProps extends ICommonProps
{
    children: JSX.Element | JSX.Element[];

    staticTitle?: boolean;

    defaultTitle: string;

    onSelectionChange? (selected: string | null): void;

    onTitleClick? (open: boolean, target: T, event: React.MouseEvent<T>): void;
}

export default memo(forwardRef((props: IDropdownProps, ref: React.ForwardedRef<T>) => {
    const [ selected, setSelected ] = useState<string | null>(null);
    const [ open, setOpen ] = useState(false);

    const { disabled, className } = props;

    const onTitleClick = useCallback((event: React.MouseEvent<T>) => setOpen(open => {
        if (disabled) return open;

        props.onTitleClick && props.onTitleClick(!open, event.target as T, event);
        return !open;
    }), [ props.onTitleClick ]);

    const updateSelected = useCallback((dispatcher: TDispatcher<string | null>) => setSelected(state => {
        setOpen(false);
        if (disabled) return state;

        const nextState = dispatcher(state);

        props.onSelectionChange && props.onSelectionChange(nextState);
        return nextState;
    }), []);

    const title = props.staticTitle ? props.defaultTitle : selected || props.defaultTitle;

    const dropdownClassName = kwtClassNames("dropdown", className, { open, disabled });
    return <div className={ dropdownClassName } ref={ ref }>
        <span children={ title } onClick={ onTitleClick } />
        <div className="items">
            <DropdownContext.Provider value={ { selected, updateSelected } }>
                { props.children }
            </DropdownContext.Provider>
        </div>
    </div>;
}));
