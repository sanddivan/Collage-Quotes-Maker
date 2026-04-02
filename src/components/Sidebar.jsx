// File: Sidebar.jsx

import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "../constants.js";
import styles from "./Sidebar.module.css";

/** @typedef {import("../types.js").Layout} Layout */

/**
 * @param {Record<string, Layout>} layouts
 * @returns {React.JSX.Element}
 */

export default function Sidebar({ layouts }) {
    return (
        <div className={styles.sidebar}>
            <h2>Settings</h2>

            <div className={styles.field}>
                <label>Canvas Width: </label>
                <input
                    type="number"
                    value={DEFAULT_CANVAS_WIDTH}
                />
            </div>

            <div className={styles.field}>
                <label>Canvas Height: </label>
                <input
                    type="number"
                    value={DEFAULT_CANVAS_HEIGHT}
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
