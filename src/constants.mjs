// File: constants.mjs

/** @typedef {import('./utils/types.mjs').LayoutDesc} LayoutDesc */

export const DEFAULT_CANVAS_WIDTH = 1280;
export const DEFAULT_CANVAS_HEIGHT = 720;

// Later, we should generate this programmatically by looking at the assets
// we have available.

/**
 * @type {Record<string, LayoutDesc>}
 */

export const LAYOUTS = {
    '0x0': { name: '0x0', rows: 0, columns: 0 },
    '2x2': { name: '2x2', rows: 2, columns: 2 },
    '3x3': { name: '3x3', rows: 3, columns: 3 },
    '2x3': { name: '2x3', rows: 2, columns: 3 },
    '3x2': { name: '3x2', rows: 3, columns: 2 },
};
