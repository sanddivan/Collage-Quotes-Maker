// File: useCollageState.mjs

/** @typedef {import('../utils/types.mjs').CollageState} CollageState */

import { useState } from 'react';
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

    const setWidth = (newWidth) => {
        setDimensions((prevState) => ({
            ...prevState,
            width: newWidth ? parseInt(newWidth) : 0
        }));
    };

    const setHeight = (newHeight) => {
        setDimensions((prevState) => ({
            ...prevState,
            height: newHeight ? parseInt(newHeight) : 0
        }));
    };

    const [layoutKey, setLayoutKey] = useState("0x0");
    const currentLayout = LAYOUTS[layoutKey];

    // JS Note to Self: "Lone" keys mean that the value is a variable with the
    // same name as the key. Example: dimensions, = dimensions: dimensions,.

    return {
        dimensions,
        setWidth,
        setHeight,
        layoutKey,
        currentLayout,
        setLayout: setLayoutKey,
        allLayouts: LAYOUTS
    }
}
