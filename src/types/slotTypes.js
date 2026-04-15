// File: slotTypes.js

/**
 * @typedef {Object} Coordinates
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} Shape
 * @property {string} kind
 * @property {Coordinates} center
 * @property {Coordinates[]} vertices
 */

/**
 * @typedef {Object} ImageSlot
 * @property {string} id
 * @property {Shape} shape
 * @property {string | null} imageUrl
 */

export {};
