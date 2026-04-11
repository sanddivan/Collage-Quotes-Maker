// File: useSlotsMeasures.js

/**
 * @param {Array<import("../types.js").ImageSlot>} slots
 * @param {number} spacing
 * @returns {Array<import("../types.js").ImageSlot>}
 */

export function useSlotsMeasures(slots, spacing) {
    if (spacing === 0) {
        return slots;
    }

    return [];
}
