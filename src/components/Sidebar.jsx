// File: Sidebar.jsx

import styles from "./Sidebar.module.css";
import baseLayoutData from "../data/base-layouts.json";
import LayoutsGrid from "./LayoutsGrid.jsx";

/** @typedef {import("../types.js").CanvasContext} CanvasContext */

/**
 * @param {CanvasContext} canvasCtx
 * @returns {React.JSX.Element}
 */

export default function Sidebar({ canvasCtx }) {
    return (
        <div className={styles.sidebar}>
            <h2>Settings</h2>

            <div className={styles.field}>
                <label>Canvas Width: </label>
                <input
                    type="number"
                    value={canvasCtx.dimensions.width}
                    min="0"
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
                    min="0"
                    onChange={(e) => canvasCtx.updateDimensionCallback(
                        'height',
                        e.target.value
                    )}
                />
            </div>

            <h3>Layout</h3>

            <div className={styles.layoutFamilyPicker}>
                {Object.keys(baseLayoutData).map((layoutFamilyKey) => (
                    <button
                        key={layoutFamilyKey}
                        className={styles.layoutBtn}
                    >
                        {layoutFamilyKey}
                    </button>
                ))}
            </div>
        </div>
    );
}
