/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { forwardRef, memo, useCallback, useContext } from "react";
import { ICommonProps, kwtClassNames } from "utils";
import button from "../Button";
import { DropdownContext } from "./DropdownComponent";

type T = HTMLButtonElement;

interface IDropdownItemProps extends Omit<ICommonProps, "disabled">
{
    children: string;

    description?: string;

    onClick? (selected: boolean, target: T, event: React.MouseEvent<T>): void;
}

export default memo(forwardRef((props: IDropdownItemProps, ref: React.ForwardedRef<T>) => {
    const { selected, updateSelected } = useContext(DropdownContext);

    if (!updateSelected) return null;

    const onComponentClick = useCallback((event: React.MouseEvent<T>) => updateSelected(state => {
        props.onClick && props.onClick(!(state === props.children), event.target as T, event);

        if (state === props.children) return null;
        else return props.children;
    }), [ props.onClick, updateSelected ]);

    const dropdownItemClassName = kwtClassNames("dropdown-item", props.className, {
        selected: selected === props.children
    });

    return <button className={ dropdownItemClassName } ref={ ref } onClick={ onComponentClick }>
        { props.children }
    </button>;
}));
