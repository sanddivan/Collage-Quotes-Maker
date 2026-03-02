// File: types.mjs

/**
 * @typedef {Object} Dimensions
 *
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {Object} LayoutDesc
 *
 * @property {string} name
 * @property {number} rows
 * @property {number} columns
 */

/**
 * @typedef {Object} CollageState
 *
 * @property {Dimensions} dimensions
 * @property {function(number|string): void} setWidth
 * @property {function(number|string): void} setHeight
 * @property {string} layoutKey
 * @property {LayoutDesc} currentLayout
 * @property {function(string): void} setLayout
 * @property {Record<string, LayoutDesc>} allLayouts
 */

export {};
