// File: Sidebar.jsx

import styles from "./Sidebar.module.css";

/**
 * @returns {React.JSX.Element}
 */

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <h2>Settings</h2>

            <div className={styles.field}>
                <label>Canvas Width: </label>
                <input type="number" value="1280" min="0" />
            </div>

            <div className={styles.field}>
                <label>Canvas Height: </label>
                <input type="number" value="1000" min="0" />
            </div>
        </div>
    );
}
