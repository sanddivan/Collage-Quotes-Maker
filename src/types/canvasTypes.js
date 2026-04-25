// File: canvasTypes.js

/**
 * @callback DimensionUpdateCallback
 * @param {'width' | 'height'} dim
 * @param {number | string} value
 * @returns {void}
 */

/**
 * @typedef {Object} CanvasContext
 * @property {number} width
 * @property {number} height
 * @property {DimensionUpdateCallback} updateDimension
 */
