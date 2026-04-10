// File: types.js

/** @typedef {import("react").Dispatch} Dispatch */
/** @typedef {import("react").SetStateAction} SetStateAction */

/**
 * @typedef {Object} CanvasContext
 * @property {Dimensions} dimensions
 * @property {DimensionUpdater} updateDimensionCallback
 * @property {LayoutContext} layoutContext
 */

/**
 * @typedef {Object} Coordinates
 * @property {number} x
 * @property {number} y
 */

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
 * @typedef {Object} ImageSlot
 * @property {string} id
 * @property {Coordinates[]} points
 * @property {string | null} imageUrl
 */

/**
 * @typedef {Object} Layout
 * @property {string} name
 * @property {ImageSlot[]} slots
 */

/**
 * @typedef {Object} LayoutContext
 * @property {string | null} layoutFamilyKey
 * @property {Dispatch<SetStateAction<string | null>>} setLayoutFamilyKeyAction
 * @property {string | null} layoutKey
 * @property {Dispatch<SetStateAction<string | null>>} setLayoutKeyAction
 */

/**
 * @typedef {Object} LayoutFamily
 * @property {string} name
 * @property {Record<string, Layout>} layouts
 */

export {};
