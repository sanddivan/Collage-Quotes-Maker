// File: useCanvasContext.js

import { useCallback, useState } from "react";
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "../constants.js";
import { useLayoutContext } from "./useLayoutContext.js";

/** @typedef {import("../types/canvasTypes.js").CanvasContext} T_CanvasContext */

/**
 * @returns {T_CanvasContext}
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

        // We can't have negative dimension values :)
        let parsedNewValue = newValue ? parseInt(newValue, 10) : 0;
        if (parsedNewValue < 0) parsedNewValue = 0;

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

    const layoutCtx = useLayoutContext();

    return {
        dimensions: dims,
        updateDimensionCallback: updateDim,
        layoutContext: layoutCtx
    };
}
