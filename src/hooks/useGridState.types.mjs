// File: useGridState.types.mjs

/**
 * @callback SlotClickHandler
 * @param {number} index
 * @returns {void}
 */

/**
 * @callback ImageUploadHandler
 * @param {ChangeEvent<HTMLInputElement>} evt
 * @returns {void}
 */

/**
 * @typedef {Object} ImageSlot
 *
 * @property {string} imgUrl
 */

/**
 * @typedef {Object} GridState
 *
 * @property {RefObject<HTMLInputElement>} imgInputRef
 * @property {Array<string | null>} slots
 * @property {SlotClickHandler} handleSlotClick
 * @property {ImageUploadHandler} handleImageUpload
 */

export {};
