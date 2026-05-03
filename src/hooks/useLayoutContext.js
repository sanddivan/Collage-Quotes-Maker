// File: useLayoutContext.js

import { useMemo, useState } from "react";

import baseLayoutData from "../data/base-layouts.json";
import baseShapeData from "../data/shapes.json";

/** @typedef {import("../types/layoutTypes.js").LayoutContext} T_LayoutContext */
/** @typedef {import("../types/layoutTypes.js").LayoutSlot} T_LayoutSlot */

/**
 * @returns {T_LayoutContext}
 */

export function useLayoutContext() {
    const [layout, setLayout] = useState(null);

    const slots = useMemo(() => (
        generateSlotsFromJSON(layout)
    ), [layout]);

    return {
        name: layout,
        setLayoutAction: setLayout,
        slots: slots
    }
}

/**
 * @param {string} layout
 * @returns {T_LayoutSlot[] | null}
 */

function generateSlotsFromJSON(layout) {
    if (!layout) return null;

    if (!Object.hasOwn(baseLayoutData, layout)) {
        throw new Error(`Layout "${layout}" was not found.`);
    }

    const slotsRawData = baseLayoutData[layout].slots;

    return slotsRawData.map((slot, index) => {
        const slotShape = baseShapeData[slot['shape']];
        const xRange = rangeStrToNumbers(slot['x-range']);
        const yRange = rangeStrToNumbers(slot['y-range']);

        const mapPointToRange = (x, y) => ({
            x: xRange.low + x * (xRange.high - xRange.low),
            y: yRange.low + y * (yRange.high - yRange.low),
        });

        return {
            id: String(index),
            center: mapPointToRange(slotShape.center.x, slotShape.center.y),
            vertices: slotShape.vertices.map((vertex) => (
                mapPointToRange(vertex.x, vertex.y)
            )),
            imageUrl: null
        };
    });
}

/**
 * @param {string} range
 * @returns {{ "low": number, "high": number }}
 */

function rangeStrToNumbers(range) {
    // Ranges are specified in the base layouts JSON as "LowerBound-HigherBound".
    const bounds = range.split('-').map((value) => Number(value));

    if (bounds.length !== 2) {
        throw new Error(
            `Invalid range ${range}. Should be in format "number-number."`
        );
    }

    // TODO: Add validation that both values were converted to numbers successfully.
    return {
        low: bounds[0],
        high: bounds[1]
    };
}
