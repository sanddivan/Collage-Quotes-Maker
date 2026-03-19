// File: CollageCanvas.jsx

/** @typedef {import('../utils/types.mjs').LayoutDesc} LayoutDesc */

import { useRef, useState } from 'react';
import './CollageCanvas.module.css'

/**
 * @param {number} width
 * @param {number} height
 * @param {LayoutDesc} layout
 * @returns {React.JSX.Element}
 */

export default function CollageCanvas({ width, height, layout }) {
    const imgInputRef = useRef(null);
    const numSlots = layout.rows * layout.columns;

    const [slots, setSlots] = useState(new Array(numSlots).fill(null));
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

    const handleSlotClick = (index) => {
        setSelectedSlotIndex(index);

        if (imgInputRef.current) {
            imgInputRef.current.click();
        }
    };

    const handleImageUpload = (evt) => {
        const file = evt.target.files[0];
        if (!file || selectedSlotIndex === null) return ;

        const newImgObj = URL.createObjectURL(file);

        setSlots((prevSlots) => {
            const updatedSlots = [...prevSlots];

            // Clean up the old Blob first if we are replacing with another
            // image, so we don't waste resources.

            const oldImgObj = updatedSlots[selectedSlotIndex]
            if (oldImgObj) {
                URL.revokeObjectURL(oldImgObj);
            }

            updatedSlots[selectedSlotIndex] = newImgObj;
            return updatedSlots;
        });

        // UX Reset. This is necessary to allow the user to pick and upload
        // the same file more than once.

        evt.target.value = '';
        setSelectedSlotIndex(null);
    };

    const gridDynamicCss = {
        '--grid-rows': layout.rows,
        '--grid-columns': layout.columns
    }

    return (
        <div className="workspace">
            <div
                className="the-canvas"
                style={{
                    width: `${width}px`,
                    height: `${height}px`
                }}
            >
                <div className="the-grid" style={gridDynamicCss}>
                    {slots.map((src, index) => (
                        <div
                            key={`slot-${index}`}
                            className="slot"
                            onClick={() => handleSlotClick(index)}
                        >
                            {src ? (
                                <img src={src} alt={`Image Slot ${index}`} />
                            ) : (
                                <div className="placeholder">
                                    <p>Click to Add Image</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <input
                type="file"
                ref={imgInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                hidden
            />
        </div>
    );
}
