// File: Sidebar.jsx

import styles from "./Sidebar.module.css";

/** @typedef {import("../types.js").CanvasContext} CanvasContext */
/** @typedef {import("../types.js").Layout} Layout */

/**
 * @param {CanvasContext} canvasCtx
 * @param {Record<string, Layout>} layouts
 * @returns {React.JSX.Element}
 */

export default function Sidebar({ canvasCtx, layouts }) {
    return (
        <div className={styles.sidebar}>
            <h2>Settings</h2>

            <div className={styles.field}>
                <label>Canvas Width: </label>
                <input
                    type="number"
                    value={canvasCtx.dimensions.width}
                    onChange={(e) => canvasCtx.updateDimensionCallback(
                        'width',
                        e.target.value
                    )}
                />
            </div>

            <div className={styles.field}>
                <label>Canvas Height: </label>
                <input
                    type="number"
                    value={canvasCtx.dimensions.height}
                    onChange={(e) => canvasCtx.updateDimensionCallback(
                        'height',
                        e.target.value
                    )}
                />
            </div>

            <h3>Layout</h3>

            <div className="layout-picker">
                {Object.keys(layouts).map((lKey) => (
                    <button key={lKey}>{lKey}</button>
                ))}
            </div>
        </div>
    )
}
