/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React, { forwardRef, memo, useCallback, useRef } from "react";
import { kwtClassNames } from "../utils";
import { TInputProps, useMask } from "./index";

/**
 * Custom Input component with ability of applying Input masks and
 * native properties support.
 *
 * @constructor
 */
type T = HTMLInputElement;
export default memo(forwardRef((props: TInputProps, ref: React.ForwardedRef<T>) => {
    const [ value, setValue ] = React.useState(String());

    // Separate native props from custom props
    const {
        icon, filter, placeholder, children, disabled, className, defaultValue, type,
        spellCheck, autoComplete,
        onInput, onFocusChange, onFocus, onBlur, onKeyPress, onKeyDown, onKeyUp, onReturn,
        onChange,
        ...nativeProps
    } = props;

    // Focus change event handler, fires with the onFocus
    // and onBlur native events.
    const onComponentFocusChange = useCallback((event: React.FocusEvent<T>) => {
        const target = event.target as T;

        onFocusChange && onFocusChange(event.type === "focus", target, event);

        // Fire specific callbacks (if provided)
        if (event.type === "focus") onFocus && onFocus(target, event);
        else onBlur && onBlur(target, event);
    }, [ onFocusChange ]);


    // Component value input (or paste) event handler.
    // @param event React FormEvent.
    const onComponentInput = useCallback(
        (event: React.FormEvent<T> | React.ChangeEvent<T>) => {
            const target = event.target as T;

            // Apply masks only if event has key data (avoid masks apply if backspace pressed)
            if (filter && (event.nativeEvent as InputEvent).data) filter.forEach(filter => {
                useMask(filter, target);
            });

            // Fire onInput callback if input event
            if (event.type === "input") onInput && onInput(target.value, target, event);

            // ... same but for change event
            if (event.type === "change") onChange && onChange(target.value, target, event as React.ChangeEvent<T>);

            setValue(target.value);
        }, [ onInput, filter ]);

    // onKeyPress native event handler, also fires onReturn custom event
    // when Enter (Return) key pressed.
    // @param event React KeyboardEvent.
    const onComponentKeyEvent = useCallback((event: React.KeyboardEvent<T>) => {
        const target = event.target as T,
            args = [ event.key, target, event ] as [ string, T, React.KeyboardEvent<T> ];

        // Check event type and fire callback.
        if (event.type === "keypress") {
            // Fire onReturn if keyPress event.
            if (event.key === "Enter") onReturn && onReturn(target.value, target, event);

            onKeyPress && onKeyPress(...args);
        } else if (event.type === "keydown") onKeyDown && onKeyDown(...args);
        else if (event.type === "keyup") onKeyUp && onKeyUp(...args);
    }, [ onKeyPress, onKeyDown, onKeyUp, onReturn ]);

    // I don't know how to combine forwarded and mutable refs without effects, so I did this.
    const inputHolderRef = useRef<HTMLInputElement>(null);
    const onComponentClick = useCallback(() => {
        if (!inputHolderRef.current) return;
        const input = inputHolderRef.current.querySelector("input") as HTMLInputElement;

        input.focus();
    }, [ inputHolderRef.current ]);

    const inputClassName = kwtClassNames("input", { disabled, "has-value": value.trim().length > 0 });
    return <div className={ inputClassName } onClick={ onComponentClick }>
        { icon && <div className="icon-holder" children={ icon } /> }

        <div className="input-holder" ref={ inputHolderRef }>
            { placeholder && <div className="placeholder">{ placeholder }</div> }
            <input type={ type || "text" } { ...nativeProps }
                   onFocus={ onComponentFocusChange }
                   onBlur={ onComponentFocusChange }

                   spellCheck={ spellCheck === true }

                   onChange={ onComponentInput }
                   onInput={ onComponentInput }

                   onKeyPress={ onComponentKeyEvent }
                   onKeyDown={ onComponentKeyEvent }
                   onKeyUp={ onComponentKeyEvent }

                   onPaste={ event => console.log(event) }
                   defaultValue={ children || defaultValue }
                   ref={ ref }
            />
        </div>
    </div>;
}));
