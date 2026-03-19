// File: useGridState.mjs

/** @typedef {import('./useGridState.types.mjs').GridState} GridState */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @param numSlots
 * @returns {GridState}
 */

export function useGridState(numSlots) {
    const imgInputRef = useRef(null);
    const [slots, setSlots] = useState(new Array(numSlots).fill(null));
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

    // Additional ref to track all active image URLs to prevent memory leaks
    // when unmounting.
    const activeImageUrls = useRef(new Set());

    const handleSlotClick = useCallback((index) => {
        setSelectedSlotIndex(index);

        if (imgInputRef.current) {
            imgInputRef.current.click();
        }
    }, []);

    const handleImageUpload = useCallback((evt) => {
        const file = evt.target.files[0];
        if (!file || selectedSlotIndex === null) return ;

        // Create and add uploaded image URL to the tracker.

        const newImgObj = URL.createObjectURL(file);
        activeImageUrls.current.add(newImgObj);

        setSlots((prevSlots) => {
            const updatedSlots = [...prevSlots];
            const oldImgObj = updatedSlots[selectedSlotIndex]

            // Clean up the old Blob first if we are replacing with another
            // image, and update the URL tracker.

            if (oldImgObj) {
                URL.revokeObjectURL(oldImgObj);
                activeImageUrls.current.delete(oldImgObj);
            }

            updatedSlots[selectedSlotIndex] = newImgObj;
            return updatedSlots;
        });

        // UX Reset. This is necessary to allow the user to pick and upload
        // the same file more than once.

        evt.target.value = '';
        setSelectedSlotIndex(null);
    }, [selectedSlotIndex]);

    // Unmount component when the hook is destroyed to not waste memory.

    useEffect(() => {
        return () => {
            activeImageUrls.current.forEach(url => URL.revokeObjectURL(url));
            activeImageUrls.current.clear();
        };
    }, []);

    return {
        imgInputRef,
        slots,
        handleSlotClick,
        handleImageUpload
    };
}
