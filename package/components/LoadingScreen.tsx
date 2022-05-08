/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { forwardRef, memo, Ref } from "react";
import { kwtClassNames } from "./utils";

type SetterOrUpdater<T> = (valOrUpdater: ((currVal: T) => T) | T) => void;

interface ILoadingScreenProps
{
    // Element that will be the parent of the loading screen component (portal)
    parentElement?: Element;

    // State management
    state: ILoadingScreenState;
}

export interface ILoadingScreenState
{
    // A loading screen component display (shown) state
    display: boolean;

    // Loading screen component title
    title?: string;
}

/** Set of active loadings */
export const loadingBus = new Set<string>();

/**
 * A custom hook to provide loadings start/stop functionality.
 * @return {{startLoading: (key: string, title?: string) => void, finishLoading: (key: string) => void}}
 */
export function useLoadingState (state: ILoadingScreenState, setState: SetterOrUpdater<ILoadingScreenState>) {
    /**
     * Start new loading with specific key and immediately change the title.
     *
     * @param {string} key loading key.
     * @param {string} title new loading screen title.
     */
    const startLoading = (key: string, title?: string) => {
        // Show warning about possible memory leak
        if (loadingBus.has("key"))
            console.warn(`Loading bus already has ${ key } key, check your component`);

        loadingBus.add(key);
        if (loadingBus.size > 0 && !state.display) setState({ display: true, title });
    };

    /**
     * Finish loading with a specific key, the title will not change.
     * @param {string} key loading key.
     */
    const finishLoading = (key: string) => {
        // Show warning about possible memory leak
        if (!loadingBus.has(key))
            console.warn(`Loading bus has no ${ key } key, check your component`);

        loadingBus.delete(key);
        if (loadingBus.size == 0) setState({ display: false, title: state.title });
    };

    return { startLoading, finishLoading };
}

/**
 * React Loading Screen component for creating loading screen; rendering through portal.
 *
 * - `parentElement` — element that will be the parent of the loading screen component (portal)
 *
 * @constructor
 * @internal
 */
export default memo(forwardRef((props: ILoadingScreenProps, ref: Ref<HTMLDivElement>) => {
    const loadingScreenClassName = kwtClassNames("loading-screen", { display: props.state.display });
    return <div className={ loadingScreenClassName } ref={ ref }>
        <div className="loading-screen-wrapper">
            <div className="progress-bar" />
            { props.state.title && <span className="loading-title">{ props.state.title }</span> }
        </div>
    </div>;
}));
