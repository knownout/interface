/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import { classNames } from "@knownout/lib";

/**
 * Add-on over @knownout/lib classNames utility function.
 * @param entries class names.
 * @return {string} generated class name.
 */
export function kwtClassNames (...entries: any[]) {
    return classNames("interface", entries);
}

export interface ICommonProps
{
    disabled?: boolean;

    className?: string;
}

export type TDispatcher<T = any> = (value: T) => T;
