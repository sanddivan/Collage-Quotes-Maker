// File: layoutTypes.js

/** @typedef {import("react").Dispatch} Dispatch */
/** @typedef {import("react").SetStateAction} SetStateAction */

/**
 * @typedef {Object} LayoutFamily
 * @property {string} name
 * @property {Record<string, Layout>} layouts
 */

/**
 * @typedef {Object} Layout
 * @property {string} name
 * @property {string} family
 * @property {import("./slotTypes.js").ImageSlot[]} slots
 */

/**
 * @typedef {Object} LayoutContext
 * @property {string | null} layoutFamilyKey
 * @property {Dispatch<SetStateAction<string | null>>} setLayoutFamilyKeyAction
 * @property {string | null} layoutKey
 * @property {Dispatch<SetStateAction<string | null>>} setLayoutKeyAction
 * @property {LayoutFamily | null} layoutFamily
 * @property {Layout | null} layout
 */

export {};
