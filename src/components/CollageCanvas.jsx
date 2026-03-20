// File: CollageCanvas.jsx

/** @typedef {import('../utils/types.mjs').LayoutDesc} LayoutDesc */

import { useGridState } from '../hooks/useGridState.mjs'
import styles from './CollageCanvas.module.css';

/**
 * @param {number} width
 * @param {number} height
 * @param {LayoutDesc} layout
 * @returns {React.JSX.Element}
 */

export default function CollageCanvas({ width, height, layout }) {
    const numSlots = layout.rows * layout.columns;
    const grid = useGridState(numSlots);

    /** @type {React.CSSProperties} */
    const gridDynamicCss = {
        '--grid-rows': Number(layout.rows),
        '--grid-columns': Number(layout.columns)
    }

    return (
        <div className={styles.workspace}>
            <div
                className={styles.theCanvas}
                style={{
                    width: `${width}px`,
                    height: `${height}px`
                }}
            >
                <div className={styles.theGrid} style={gridDynamicCss}>
                    {grid.slots.map((src, index) => (
                        <div
                            key={`slot-${index}`}
                            className={styles.slot}
                            onClick={() => grid.handleSlotClick(index)}
                        >
                            {src ? (
                                <img src={src} alt={`Image Slot ${index}`} />
                            ) : (
                                <div className={styles.placeholder}>
                                    <p>Click to Add Image</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <input
                type="file"
                ref={grid.imgInputRef}
                onChange={grid.handleImageUpload}
                accept="image/*"
                hidden
            />
        </div>
    );
}
