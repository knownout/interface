/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { forwardRef, memo, useCallback, useState } from "react";
import { ICommonProps, kwtClassNames } from "./utils";
import { limitNumber } from "@knownout/lib";

interface IButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">, ICommonProps
{
    // Min async loading time
    minLoadingTime?: number;

    icon?: JSX.Element;

    children: any;

    // Disable button while loading
    disableOnLoading?: boolean;

    ref?: React.LegacyRef<HTMLButtonElement>;

    // Button custom click event with async actions support
    onClick? (target: HTMLButtonElement, event: React.MouseEvent<HTMLButtonElement>, loading: boolean):
        Promise<void> | void;

    // Async action exceptions handler
    onAsyncException? (exception?: any): void;

    // Callback for async action (fires after promise resolves)
    onAsyncCallback? (target: HTMLButtonElement): void;
}

/**
 * React Button component with async actions full support.
 *
 * - `onClick` now supports functions, that return Promise<void>. Button
 * will become in loading state until promise resolves.
 *
 * - Provide `onAsyncException` to handle async exceptions. To fire
 * action after promise resolves, provide `onAsyncCallback`.
 *
 * @constructor
 */
export default memo(forwardRef((props: IButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const [ loading, setLoading ] = useState(false);

    // Separate custom properties from native.
    const {
        className, children, icon, disabled, minLoadingTime, disableOnLoading,
        onClick, onAsyncException, onAsyncCallback,
        ...nativeProps
    } = props;

    // Check if button in disabled state.
    const buttonDisabled = disableOnLoading ? loading || disabled : disabled;

    // Default handler for async exceptions (rejected).
    const asyncExceptionHandler = useCallback((exception?: any) => {
        if (onAsyncException) return onAsyncException(exception);

        console.warn("Exception occurred while preforming async click action");
        console.warn("Provide onAsyncException handler to suppress this message");
        console.error(exception);
    }, [ onAsyncException ]);

    // Button click event handler.
    const onComponentClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        if (!onClick || buttonDisabled) return;

        // Get event target and click function response.
        const target = event.target as HTMLButtonElement,
            response = onClick(target, event, loading);

        // Check if response is promise.
        if (!response || !("then" in response)) return;

        const loadingStartTime = Date.now();
        setLoading(true);

        response.then(() => onAsyncCallback && onAsyncCallback(target)).catch(asyncExceptionHandler).finally(() => {
            const processTimeLeft = (minLoadingTime || 0) - (Date.now() - loadingStartTime);

            // Wait at least (minLoadingTime)ms.
            setTimeout(() => setLoading(false), limitNumber(processTimeLeft, { bottom: 0 }));
        });
    }, [ onClick, buttonDisabled, onAsyncCallback, asyncExceptionHandler ]);

    const buttonClassName = kwtClassNames("button", className, { loading, disabled: buttonDisabled });
    return <button className={ buttonClassName } { ...nativeProps } onClick={ onComponentClick } ref={ ref }>
        { icon && <div className="icon-holder" children={ icon } /> }
        <div className="button-child" children={ children } />
    </button>;
}));
