/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import React from "react";

export { default } from "./Input";

/**
 * Type for the Input component masks
 */
export type InputMask = [ RegExp, string | ((substring: string, ...args: any[]) => string) ];

/**
 * Custom props for the Input component
 */
export interface IInputProps<T = HTMLInputElement>
{
    // Inline render icon to the side of the Input component
    icon?: JSX.Element;

    // Apply masks to the Input value
    filter?: InputMask[];

    placeholder?: any;

    // Default value for native Input element (cannot be changed dynamically)
    children?: string;

    disabled?: boolean;

    type?: "text" | "email" | "tel" | "password";

    // Add-on over native onInput event
    onInput? (value: string, target: T, event: React.FormEvent<T>): void;

    // Fires when onBlur or onFocus events get fired
    onFocusChange? (focus: boolean, target: T, event: React.FocusEvent<T>): void;

    onFocus? (target: T, event: React.FocusEvent<T>): void;

    onBlur? (target: T, event: React.FocusEvent<T>): void;

    // Add-on over native onKeyPress event
    onKeyPress? (key: string, target: T, event: React.KeyboardEvent<T>): void;

    onKeyDown? (key: string, target: T, event: React.KeyboardEvent<T>): void;

    onKeyUp? (key: string, target: T, event: React.KeyboardEvent<T>): void;

    // Fires when Enter (Return) key pressed
    onReturn? (value: string, target: T, event: React.KeyboardEvent<T>): void;

    onChange? (value: string, target: T, event: React.ChangeEvent<T>): void;
}

/**
 * Extended properties for the Input component with native props support
 */
export type TInputProps = Omit<React.HTMLProps<HTMLInputElement>, keyof IInputProps> & IInputProps;

/**
 * Dynamically apply masks to the Input component value
 * @param mask array of regular expression and replacer
 * @param input native Input element
 */
export function useMask (mask: InputMask, input: HTMLInputElement) {
    // Get start caret position
    let caret = input.selectionStart || 0;

    // Virtually apply masks to the Input value
    const nextValue = input.value.trimLeft().replace(mask[0], mask[1] as any);

    // Calculate new caret position
    caret += nextValue.length - input.value.length;

    // Apply new Input value
    input.value = nextValue;

    // Update caret position
    input.setSelectionRange(caret, caret);
}
