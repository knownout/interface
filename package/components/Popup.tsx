/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { forwardRef, memo, Ref, useCallback } from "react";
import { createPortal } from "react-dom";
import { kwtClassNames } from "./utils";

type SetterOrUpdater<T> = (valOrUpdater: ((currVal: T) => T) | T) => void;

interface IPopupProps
{
    // Element that will be the parent of the popup component (portal)
    parentElement?: Element;

    // Set false to disable hiding popups when clicked outside the wrapper.
    hideOnClick?: boolean;

    // State management
    popupState: IPopupState,

    setPopupState: SetterOrUpdater<IPopupState>;

    // Custom mouse click event
    onClick? (target: HTMLDivElement, root: boolean, event: React.MouseEvent<HTMLDivElement>): void;
}

export interface IPopupState
{
    // Popup component display (shown) state
    display: boolean;

    // Popup component content
    content?: JSX.Element;
}

/**
 * A custom hook to facilitate popup state changes
 *
 * @return {[IPopupState, (state: Partial<IPopupState>) => void]}
 */
export function usePopupState (state: IPopupState, setState: SetterOrUpdater<IPopupState>) {
    /**
     * A function to add the ability to partially change the state of the popup.
     *
     * @param {Partial<IPopupState>} state partial state
     */
    const setPopupState = (state: Partial<IPopupState>) =>
        setState(current => Object.assign({}, current, state));

    return [ state, setPopupState ] as [ IPopupState, typeof setPopupState ];
}

/**
 * React Popup component for creating popup elements; rendering through portal.
 *
 * - `onClick` — custom popup click attribute witch contains: target (HTMLDivElement),
 * root (boolean, is user clicked on popup root component or not), event (MouseEvent).
 *
 * - `hideOnClick` — set false to disable hiding popups when clicked outside the wrapper.
 *
 * - `parentElement` — element that will be the parent of the popup component (portal)
 *
 * @constructor
 * @internal
 */
export default memo(forwardRef((props: IPopupProps, ref: Ref<HTMLDivElement>) => {
    const [ popupState, setPopupState ] = usePopupState(props.popupState, props.setPopupState);

    // Whole popup click event handler
    const clickEventHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;

        // Check if user clicked on a root element
        const root = target.classList.contains("popup-component");

        // Execute custom click event
        props.onClick && props.onClick(target, root, event);

        if (!root || props.hideOnClick === false) return;
        setPopupState({ display: false });

    }, [ popupState, props.hideOnClick ]);

    const popupClassName = kwtClassNames("popup", { display: popupState.display });
    const popupComponent = <div className={ popupClassName } onClick={ clickEventHandler } ref={ ref }>
        <div className="popup-child">
            { popupState.content }
        </div>
    </div>;

    // Render component
    return createPortal(popupComponent, props.parentElement || document.body);
}));
