// File: types.js

/** @typedef {import("react").Dispatch} Dispatch */
/** @typedef {import("react").SetStateAction} SetStateAction */

/**
 * @typedef {Object} Dimensions
 * @property {number} width
 * @property {number} height
 * @property {number} aspectRatio
 */

/**
 * @callback DimensionUpdater
 * @param {'width' | 'height'} dim
 * @param {number | string} newValue
 * @returns {void}
 */

/**
 * @typedef {Object} Layout
 * @property {string} name
 * @property {number} rows
 * @property {number} columns
 */

/**
 * @typedef {Object} CanvasContext
 * @property {Dimensions} dimensions
 * @property {DimensionUpdater} updateDimensionCallback
 * @property {Layout | null} layout
 * @property {Dispatch<SetStateAction<string>>} setLayoutAction
 */

export {};
