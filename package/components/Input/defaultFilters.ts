import { InputMask } from "./index";

/**
 * List of common masks for the Input component.
 */
const defaultFilters = {
    /** Just clean extra spaces from Input. */
    cleanSpaces: [ /\s{2,}/, " " ] as InputMask,

    /** Allow Input only latin symbols and numbers. */
    numbersLatinOnly: [ /[^A-Za-z0-9]/g, "" ] as InputMask,

    /** Allow Input latin symbols, numbers, and some special symbols. */
    latinWithSymbols: [ /[^A-Za-z0-9\-_+=.,?!()*$#%^&\\|/<>\[\]"@ ]/g, "" ] as InputMask,

    /** Allow Input latin and cyrillic symbols, numbers, and some special symbols. */
    latinCyrillicWithSymbols: [ /[^A-Za-zА-ЯЁа-яё0-9\-_+=.,?!()*$#%^&\\|/<>\[\]"@ ]/g, "" ] as InputMask,

    /** Allow Input only latin and cyrillic symbols and numbers. */
    latinCyrillicOnly: [ /[^A-Za-z0-9А-ЯЁа-яё]/g, "" ] as InputMask,

    /** Just format punctuation of the Input value. */
    formatPunctuation: [
        [ /\s{2,}/, " " ],
        [ /([,.]){2,}/g, "$1" ],
        [ /([,.])([^\s])/g, "$1 $2" ],
        [ /\.\s([a-zа-яё])/g, (f: string) => f.toLocaleUpperCase() ],
        [ /(\s+)([А-Я])\.\s+([А-Я])\.(\s*)/g, "$1$2.$3.$4" ]
    ] as InputMask[]
};

export default defaultFilters;
