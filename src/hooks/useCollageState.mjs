// File: useCollageState.mjs

import { useCallback, useState } from 'react';
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT, LAYOUTS } from '../utils/constants.mjs';

/**
 * Configures and keeps the general state of the whole collage page.
 * @returns {CollageState}
 */

export function useCollageState() {
    const [dimensions, setDimensions] = useState({
        width: DEFAULT_CANVAS_WIDTH,
        height: DEFAULT_CANVAS_HEIGHT,
        aspectRatio: DEFAULT_CANVAS_WIDTH / DEFAULT_CANVAS_HEIGHT
    });

    const updateDimension = useCallback((dim, newValue) => {
        if (dim !== 'width' && dim !== 'height') {
            console.error(`Invalid dimension "${dim}". Has to be 'height' or 'width'.`);
            return ;
        }

        const parsedDimValue = newValue ? parseInt(newValue, 10) : 0;

        setDimensions(prevDimsState => {
            const newWidth = dim === 'width' ? parsedDimValue : prevDimsState.width;
            const newHeight = dim === 'height' ? parsedDimValue : prevDimsState.height;

            // Protecting against division by zero with this.
            const newAspectRatio = (newWidth === 0 || newWidth === 0)
                ? 0
                : newWidth / newHeight;

            return {
                width: newWidth,
                height: newHeight,
                aspectRatio: newAspectRatio
            };
        });
    }, []);

    const [layoutKey, setLayoutKey] = useState('0x0');
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
