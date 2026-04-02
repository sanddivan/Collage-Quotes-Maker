// File: types.mjs

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
 * @property {number} aspectRatio
 */

/**
 * @typedef {Object} LayoutDesc
 *
 * @property {string} name
 * @property {number} rows
 * @property {number} columns
 */

/**
 * @typedef {Object} ImageSlot
 *
 * @property {string} imgUrl
 * @property {Dimensions} imgOrigDimensions
 * @property {Dimensions} imgCurrDimensions
 * @property {Dimensions} slotDimensions
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
