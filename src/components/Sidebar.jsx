// File: Sidebar.jsx

import styles from "./Sidebar.module.css";
import baseLayoutData from "../data/base-layouts.json";

/** @typedef {import("../types/canvasTypes.js").CanvasContext} T_CanvasContext */
/** @typedef {import("../types/layoutTypes.js").LayoutContext} T_LayoutContext */

/**
 * @param props
 * @param {T_CanvasContext} props.canvasCtx
 * @param {T_LayoutContext} props.layoutCtx
 * @returns {React.JSX.Element}
 */

export default function Sidebar({ canvasCtx, layoutCtx }) {
    return (
        <div className={styles.sidebar}>
            <h2>Settings</h2>

            <div className={styles.field}>
                <label>Canvas Width: </label>
                <input
                    type="number"
                    value={canvasCtx.width}
                    min="0"
                    onChange={(e) => canvasCtx.updateDimension('width', e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <label>Canvas Height: </label>
                <input
                    type="number"
                    value={canvasCtx.height}
                    min="0"
                    onChange={(e) => canvasCtx.updateDimension('height', e.target.value)}
                />
            </div>

            <h3>Layout</h3>

            <div className="layout-picker">
                {Object.keys(baseLayoutData).map((layoutName) => (
                    <button
                        key={layoutName}
                        className={styles.layoutBtn}
                        onClick={() => layoutCtx.setLayoutAction(layoutName)}
                        style={{
                            fontWeight: layoutName === layoutCtx.name
                                ? "bold"
                                : "normal"
                        }}
                    >
                        {layoutName}
                    </button>
                ))}
            </div>
        </div>
    );
}
