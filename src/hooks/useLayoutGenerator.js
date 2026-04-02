// File: useLayoutGenerator.js

/** @typedef {import("../types.js").Layout} Layout */

/**
 * @returns {Record<string, Layout>}
 */

export function useLayoutGenerator() {
    // This is a stub. We'll be creating the layouts programmatically later on.
    return {
        '2x2': { name: '2x2', rows: 2, columns: 2 },
        '3x3': { name: '3x3', rows: 3, columns: 3 },
        '2x3': { name: '2x3', rows: 2, columns: 3 },
        '3x2': { name: '3x2', rows: 3, columns: 2 }
    }
}
