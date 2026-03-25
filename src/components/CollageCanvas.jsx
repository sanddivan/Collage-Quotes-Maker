// File: CollageCanvas.jsx

import { useRef } from 'react';

import { useGridState } from '../hooks/useGridState.mjs'
import styles from './CollageCanvas.module.css';
import DownloadButton from "./DownloadButton.jsx";

/**
 * @param {Dimensions} dimensions
 * @param {LayoutDesc} layout
 * @returns {React.JSX.Element}
 */

export default function CollageCanvas({ dimensions, layout }) {
    const numSlots = layout.rows * layout.columns;
    const grid = useGridState(numSlots);
    const canvasRef = useRef(null);

    /** @type {React.CSSProperties} */
    const gridDynamicCss = {
        '--grid-rows': Number(layout.rows),
        '--grid-columns': Number(layout.columns)
    }

    return (
        <div className={styles.workspace}>
            <div
                ref={canvasRef}
                className={styles.theCanvas}
                style={{
                    width: `${dimensions.width}px`,
                    height: `${dimensions.height}px`
                }}
            >
                <div className={styles.theGrid} style={gridDynamicCss}>
                    {grid.slots.map((slotData, index) => (
                        <div
                            key={`slot-${index}`}
                            ref={(elem) => (grid.slotRefs.current[index] = elem)}
                            className={styles.slot}
                            onClick={() => grid.handleSlotClick(index)}
                        >
                            {slotData?.imgUrl ? (
                                <img src={slotData.imgUrl} alt={`Image Slot ${index}`} />
                            ) : (
                                <div className={styles.placeholder}>
                                    <p>Click to Add Image</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <DownloadButton canvasRef={canvasRef} />

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
