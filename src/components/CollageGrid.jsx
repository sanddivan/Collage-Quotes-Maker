// File: CollageGrid.jsx

/** @typedef {import('../utils/types.mjs').LayoutDesc} LayoutDesc */

import { useRef, useState } from "react";

/**
 * @param {LayoutDesc} layout
 */

export default function CollageGrid({ layout }) {
    const imgInputRef = useRef(null);
    const numSlots = layout.rows * layout.columns;

    const [images, setImages] = useState(new Array(numSlots).fill(null));
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

        setImages((prevImages) => {
            const updatedImages = [...prevImages];

            // Clean up the old Blob first if we are replacing with another
            // image, so we don't waste resources.

            const oldImgObj = updatedImages[selectedSlotIndex]
            if (oldImgObj) {
                URL.revokeObjectURL(oldImgObj);
            }

            updatedImages[selectedSlotIndex] = newImgObj;
            return updatedImages;
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
        <div className="the-grid"></div>
    )
}
