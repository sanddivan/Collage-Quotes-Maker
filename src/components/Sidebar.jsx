// File: Sidebar.jsx

import styles from "./Sidebar.module.css";

/** @typedef {import("../types.js").CanvasContext} T_CanvasContext */

/**
 * @param props
 * @param {T_CanvasContext} props.canvasCtx
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
        </div>
    );
}
