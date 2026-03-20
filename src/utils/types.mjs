// File: types.mjs

/** @typedef {import('react').Dispatch} Dispatch */
/** @typedef {import('react').SetStateAction} SetStateAction */

/**
 * @callback DimensionUpdater
 * @param {'width' | 'height'} dim
 * @param {number | string} newValue
 * @returns {void}
 */

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
 * @property {string} layoutKey
 * @property {LayoutDesc} currentLayout
 * @property {Record<string, LayoutDesc>} allLayouts
 * @property {Dispatch<SetStateAction<string>>} setLayoutFunc
 * @property {DimensionUpdater} updateDimensionFunc
 */

export {};
