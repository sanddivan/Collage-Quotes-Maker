// File: useGridState.mjs

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @param numSlots
 * @returns {GridState}
 */

export function useGridState(numSlots) {
    const imgInputRef = useRef(null);

    // The slots themselves.

    const slotRefs = useRef([]);

    // The images of each slot. These are represented by a temporary URL.
    // More on that later.

    const [slots, setSlots] = useState(new Array(numSlots).fill(null));
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

    // Additional ref to track all active image URLs to prevent memory leaks
    // when unmounting.

    const activeImageUrls = useRef(new Set());

    // The Resize Observer: Since we require to know the dimensions of our slots
    // and uploaded images at all times to ensure they fit as best as possible,
    // we need an observer to watch for size changes. After all, we support
    // customizations like spacing between slots, which change their sizes.

    useEffect(() => {
        /** @type {ResizeObserver[]} */
        const observers = [];

        slotRefs.current.forEach((slotNode, index) => {
            if (!slotNode) return ;

            const slotObserver = new ResizeObserver((entries) => {
                const { width, height } = entries[0].contentRect;

                setSlots((prevSlots) => {
                });
            });

            slotObserver.observe(slotNode);
            observers.push(slotObserver);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [slots.length]);

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

    // When a new layout is selected, sync with the canvas to display the new
    // slots accordingly.

    useEffect(() => {
        setSlots((prevSlots) => {
            if (!prevSlots) {
                return new Array(numSlots || 0).fill(null);
            }

            if (prevSlots.length === numSlots) return ;

            // If the grid shrinks, then images are removed. We have to free
            // the resources to keep our app light and responsive.

            if (prevSlots.length > numSlots) {
                const removedSlots = prevSlots.slice(numSlots);

                removedSlots.forEach(url => {
                    if (url) {
                        URL.revokeObjectURL(url);
                        activeImageUrls.current.delete(url);
                    }
                });

                return prevSlots.slice(0, numSlots);
            }

            // If the grid grew, then we generate the new empty slots for the
            // new layout.

            const newSlots = new Array(numSlots - prevSlots.length).fill(null);
            return [...prevSlots, ...newSlots]
        });
    }, [numSlots]);

    // Unmount component when the hook is destroyed to not waste memory.

    useEffect(() => {
        return () => {
            activeImageUrls.current.forEach(url => URL.revokeObjectURL(url));
            activeImageUrls.current.clear();
        };
    }, []);

    return {
        imgInputRef,
        slots: slots,
        handleSlotClick,
        handleImageUpload
    };
}

function wasResized(slot) {
}
