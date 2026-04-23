// File: useLayoutSlots.js

// TODO: Make proper types once we confirm this functionality works properly,
//       and we confirm it is what we need.

import baseShapeData from "../data/shapes.json";

/**
 * @typedef {{ "x-range": string, "y-range": string, "shape": string }} SlotData
 */

/**
 * @typedef {Object} Coordinates
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {SlotData[]} slotsData
 * @param {number} spacing
 */

export function useLayoutSlots(slotsData, spacing) {
    return slotsData.map((slot) => {
        const slotShape = baseShapeData[slot['shape']];
        const xRange = rangeStrToNumbers(slot['x-range']);
        const yRange = rangeStrToNumbers(slot['y-range']);
        return mapVerticesToRange(slotShape, xRange, yRange);
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

/**
 * @param {{ "center": Coordinates, "vertices": Coordinates[] }} shapeData
 * @param {{ "low": number, "high": number }} xRange
 * @param {{ "low": number, "high": number }} yRange
 * @returns {{ "center": Coordinates, "vertices": Coordinates[] }}
 */

function mapVerticesToRange(shapeData, xRange, yRange) {
    const shapeCenter = shapeData.center;
    const shapeVertices = shapeData.vertices;

    const mapPoint = (x, y) => ({
        x: xRange.low + x * (xRange.high - xRange.low),
        y: yRange.low + y * (yRange.high - yRange.low)
    });

    return {
        "center": mapPoint(shapeCenter.x, shapeCenter.y),
        "vertices": shapeVertices.map((vertex) => (
            mapPoint(vertex.x, vertex.y)
        ))
    }
}
