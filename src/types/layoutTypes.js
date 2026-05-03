// File: layoutTypes.js

/** @typedef {import("react").Dispatch} Dispatch */
/** @typedef {import("react").SetStateAction} SetStateAction */

/**
 * @typedef {Object} Coordinates
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} LayoutSlot
 * @property {string} id
 * @property {Coordinates} center
 * @property {Coordinates[]} vertices
 * @property {string | null} imageUrl
 */

/**
 * @typedef {Object} LayoutContext
 * @property {string | null} name
 * @property {Dispatch<SetStateAction<string | null>>} setLayoutAction
 * @property {LayoutSlot[] | null} slots
 */

// What does a Slot have?
//
// - Center
// - Vertices (i.e. a shape)
// - Image
// - Frame Color
//
// Dependencies:
//
// - Layout
// - Spacing
// - Canvas Dimensions
