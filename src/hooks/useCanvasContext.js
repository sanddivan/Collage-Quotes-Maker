// File: useCanvasContext.js

import { useCallback, useState } from "react";
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "../constants.js";

/** @typedef {import("../types.js").CanvasContext} CanvasContext */
/** @typedef {import("../types.js").Layout} Layout */

/**
 * @returns {CanvasContext}
 */

export function useCanvasContext() {
    const [dims, setDims] = useState({
        width: DEFAULT_CANVAS_WIDTH,
        height: DEFAULT_CANVAS_HEIGHT,
        aspectRatio: DEFAULT_CANVAS_WIDTH / DEFAULT_CANVAS_HEIGHT
    });

    const updateDim = useCallback((dim, newValue) => {
        if (dim !== 'width' && dim !== 'height') {
            console.error(`Invalid dimension "${dim}". Has to be 'height' or 'width'.`);
            return ;
        }

        const parsedNewValue = newValue ? parseInt(newValue, 10) : 0;

        setDims(prevDimsState => {
            const newWidth = dim === 'width' ? parsedNewValue : prevDimsState.width;
            const newHeight = dim === 'height' ? parsedNewValue : prevDimsState.height;

            const newAspectRatio = (newWidth === 0 || newHeight === 0)
                ? 0
                : newWidth / newHeight;

            return {
                width: newWidth,
                height: newHeight,
                aspectRatio: newAspectRatio
            };
        });
    }, []);

    const [layout, setLayout] = useState(null);

    return {
        dimensions: dims,
        updateDimensionCallback: updateDim,
        layout: layout,
        setLayoutAction: setLayout
    };
}
