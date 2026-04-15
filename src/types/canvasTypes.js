// File: canvasTypes.js

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
 * @typedef {Object} CanvasContext
 * @property {Dimensions} dimensions
 * @property {DimensionUpdater} updateDimensionCallback
 * @property {import("./layoutTypes.js").LayoutContext} layoutContext
 */
