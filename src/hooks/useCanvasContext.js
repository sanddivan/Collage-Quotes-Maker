// File: useCanvasContext.js

import { useCallback, useState } from "react";

/** @typedef {import("../types/canvasTypes.js").CanvasContext} T_CanvasContext */

/**
 * @returns {T_CanvasContext}
 */

export function useCanvasContext() {
    const [width, setWidth] = useState(1280);
    const [height, setHeight] = useState(720);

    const updateDimension = useCallback((dim, value) => {
        if (dim !== 'width' && dim !== 'height') {
            console.error(`Invalid dimension "${dim}". Has to be 'height' or 'width'.`);
            return ;
        }

        let parsedValue = value ? parseInt(value, 10) : 0;
        if (parsedValue < 0) parsedValue = 0;

        if (dim === 'width') setWidth(parsedValue);
        else setHeight(parsedValue);
    }, []);

    return { width, height, updateDimension };
}
