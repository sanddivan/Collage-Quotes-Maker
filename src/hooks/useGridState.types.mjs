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
 * @typedef {Object} GridState
 *
 * @property {RefObject<HTMLInputElement>} imgInputRef
 * @property {Array<ImageSlot | null>} slots
 * @property {RefObject<HTMLDivElement[]>} slotRefs
 * @property {SlotClickHandler} handleSlotClick
 * @property {ImageUploadHandler} handleImageUpload
 */

export {};
