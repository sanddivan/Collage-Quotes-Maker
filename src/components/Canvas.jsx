// File: Canvas.jsx

import styles from "./Canvas.module.css";

export default function Canvas({ width, height }) {
    /** @type {React.CSSProperties} */
    const canvasDimensionsCss = {
        '--canvas-width': `${width}px`,
        '--canvas-height': `${height}px`
    }

    return (
        <div className={styles.workspace}>
            <div className={styles.theCanvas} style={canvasDimensionsCss}>
                <p>Hello from the canvas!</p>
            </div>
        </div>
    );
}
