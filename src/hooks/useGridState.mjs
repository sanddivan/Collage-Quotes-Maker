// File: useGridState.mjs

import { useCallback, useEffect, useRef, useState } from 'react';
import { useImgSizeAdjustment } from './useImgSizeAdjustment.mjs';

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
                // This is something I need to reason more about.

                const { width, height } = entries[0].contentRect;

                const newDims = {
                    width,
                    height,
                    aspectRatio: width / height
                }

                setSlots((prevSlots) => {
                    if (!wasResized(prevSlots[index], newDims))
                        return prevSlots;

                    const updatedSlots = [...prevSlots];

                    updatedSlots[index] = {
                        ...updatedSlots[index],
                        slotDimensions: newDims
                    }

                    return updatedSlots;
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

    const handleImageUpload = useCallback(async (evt) => {
        const file = evt.target.files[0];
        if (!file || selectedSlotIndex === null) return ;

        // Create and add uploaded image URL to the tracker.

        const newImgObj = URL.createObjectURL(file);
        activeImageUrls.current.add(newImgObj);

        const activeSlotNode = slotRefs.current[selectedSlotIndex];

        const slotDims = activeSlotNode
            ? domRectToDimensions(activeSlotNode.getBoundingClientRect())
            : { width: 0, height: 0, aspectRatio: 0 }

        const { imgDims } = await new Promise((resolve) => {
            const img = new Image();

            // NEXT STEP: I think we have to then somehow pass this to the
            // <img> tag styles.

            img.onload = () => resolve({
                imgDims: useImgSizeAdjustment(
                    img.naturalWidth,
                    img.naturalHeight,
                    slotDims
                )
            });

            img.src = newImgObj;
        });

        setSlots((prevSlots) => {
            const updatedSlots = [...prevSlots];
            const oldImgObj = updatedSlots[selectedSlotIndex]

            // Clean up the old Blob first if we are replacing with another
            // image, and update the URL tracker.

            if (oldImgObj) {
                URL.revokeObjectURL(oldImgObj.url);
                activeImageUrls.current.delete(oldImgObj.url);
            }

            updatedSlots[selectedSlotIndex] = {
                imgUrl: newImgObj,
                imgDimensions: imgDims,
                slotDimensions: slotDims
            };

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
        slots,
        slotRefs,
        handleSlotClick,
        handleImageUpload
    };
}

/**
 * @param {ImageSlot} slot
 * @param {Dimensions} newDims
 * @returns {boolean}
 */
function wasResized(slot, newDims) {
    if (!slot) return false;

    const slotWidth = slot.slotDimensions.width;
    const slotHeight = slot.slotDimensions.height;

    return slotWidth !== newDims.width || slotHeight !== newDims.height;
}

/**
 * @param {DOMRect} rect
 * @returns {Dimensions}
 */
function domRectToDimensions(rect) {
    return {
        width: rect.width,
        height: rect.height,
        aspectRatio: rect.width / rect.height
    }
}
