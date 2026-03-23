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

    const updateDimension = useCallback((dimChanged, newValue) => {
        if (dimChanged !== 'width' && dimChanged !== 'height') {
            console.error(`Invalid dimension "${dimChanged}". Has to be 'height' or 'width'.`);
            return ;
        }

        // Since we need to always respect the image's aspect ratio, we have
        // to calculate the other dimension when one is updated. For this,
        // we apply the following formula:
        //
        // If height changed, and thus we need a new width:
        // New Width = Height * Aspect Ratio
        //
        // If width changed, and thus we need a new height:
        // New Height = Width / Aspect Ratio

        const parsedDimValue = newValue ? parseInt(newValue, 10) : 0;
        const dimToUpdate = dimChanged === 'width' ? 'height' : 'width';

        setDimensions(prevDimsState => ({
            ...prevDimsState,
            [dimChanged]: parsedDimValue,
            [dimToUpdate]: dimToUpdate === 'width'
                ? parsedDimValue * prevDimsState.aspectRatio // New Width
                : parsedDimValue / prevDimsState.aspectRatio // New Height
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
