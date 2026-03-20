// File: useCollageState.mjs

/** @typedef {import('../utils/types.mjs').CollageState} CollageState */

import { useCallback, useState } from 'react';
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT, LAYOUTS } from '../constants.mjs';

/**
 * Configures and keeps the general state of the whole collage page.
 * @returns {CollageState}
 */

export default function useCollageState() {
    const [dimensions, setDimensions] = useState({
        width: DEFAULT_CANVAS_WIDTH,
        height: DEFAULT_CANVAS_HEIGHT
    });

    const updateDimension = useCallback((dim, newValue) => {
        if (dim !== 'width' && dim !== 'height') {
            console.error(`Invalid dimension "${dim}". Has to be 'height' or 'width'.`);
            return ;
        }

        const parsedValue = newValue ? parseInt(newValue, 10) : 0;

        setDimensions(prevDimsState => ({
            ...prevDimsState,
            [dim]: parsedValue
        }));
    }, []);

    const [layoutKey, setLayoutKey] = useState("0x0");
    const currentLayout = LAYOUTS[layoutKey];

    // JS Note to Self: "Lone" keys mean that the value is a variable with the
    // same name as the key. Example: dimensions, = dimensions: dimensions,.

    return {
        dimensions,
        layoutKey,
        currentLayout,
        allLayouts: LAYOUTS,
        setLayoutFunc: setLayoutKey,
        updateDimensionFunc: updateDimension
    }
}
