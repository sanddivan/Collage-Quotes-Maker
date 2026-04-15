// File: layoutTypes.js

/** @typedef {import("react").Dispatch} Dispatch */
/** @typedef {import("react").SetStateAction} SetStateAction */

/** @typedef {import("./slotTypes.js").ImageSlot} T_ImageSlot */

/**
 * @typedef {Object} Layout
 * @property {string} name
 * @property {string} familyName
 * @property {T_ImageSlot[]} slots
 */

/**
 * @typedef {Object} LayoutFamily
 * @property {string} name
 * @property {Object.<string, Layout>} layouts
 */

/**
 * @typedef {Object} LayoutContext
 * @property {string | null} layoutFamilyKey
 * @property {Dispatch<SetStateAction<string | null>>} setLayoutFamilyKeyAction
 * @property {string | null} layoutKey
 * @property {Dispatch<SetStateAction<string | null>>} setLayoutKeyAction
 * @property {LayoutFamily | null} layoutFamilyData
 * @property {Layout | null} layoutData
 */

export {};
