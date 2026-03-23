export default function CollageCanvas({ width, height, layout }) {
    const numSlots = layout.rows * layout.columns;
    const grid = useGridState(numSlots);
    const canvasRef = useRef(null);

    /** @type {React.CSSProperties} */
    const gridDynamicCss = {
        '--grid-rows': Number(layout.rows),
        '--grid-columns': Number(layout.columns)
    };

    return (
        <div className={styles.workspace}>
            <div
                ref={canvasRef}
                className={styles.theCanvas}
                style={{
                    width: `${width}px`,
                    height: `${height}px`
                }}
            >
                <div className={styles.theGrid} style={gridDynamicCss}>
                    {/* Notice we are calling the item slotData now, not src */}
                    {grid.slots.map((slotData, index) => (
                        <div
                            key={`slot-${index}`}
                            ref={(el) => (grid.slotRefs.current[index] = el)} // NEW: Attach the ref here
                            className={styles.slot}
                            onClick={() => grid.handleSlotClick(index)}
                        >
                            {/* NEW: Check for slotData.url instead of just slotData */}
                            {slotData?.url ? (
                                <img src={slotData.url} alt={`Image Slot ${index}`} />
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

import { useState, useRef, useCallback, useEffect } from 'react';

export function useGridState(numSlots) {
    const imgInputRef = useRef(null);
    const slotRefs = useRef([]);
    const [slots, setSlots] = useState(new Array(numSlots).fill(null));
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
    const activeImageUrls = useRef(new Set());

    // --- STRATEGY 2: THE RESIZE OBSERVER ---
    useEffect(() => {
        const observers = [];

        slotRefs.current.forEach((slotNode, index) => {
            if (!slotNode) return;

            const observer = new ResizeObserver((entries) => {
                const { width, height } = entries[0].contentRect;

                setSlots((prev) => {
                    // Only update if the slot exists and the dimensions actually changed
                    if (!prev[index]) return prev;
                    if (prev[index].slotWidth === width && prev[index].slotHeight === height) {
                        return prev;
                    }

                    const next = [...prev];
                    next[index] = {
                        ...next[index],
                        slotWidth: width,
                        slotHeight: height,
                        // Recalculate aspect ratio magic live
                        slotAspectRatio: width / height
                    };
                    return next;
                });
            });

            observer.observe(slotNode);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [slots.length]); // Re-attach if the number of slots changes

    const handleSlotClick = useCallback((index) => {
        setSelectedSlotIndex(index);
        if (imgInputRef.current) imgInputRef.current.click();
    }, []);

    const handleImageUpload = useCallback(async (evt) => {
        const file = evt.target.files[0];
        if (!file || selectedSlotIndex === null) return;

        const newImgObj = URL.createObjectURL(file);
        activeImageUrls.current.add(newImgObj);

        // Get initial slot dimensions for the first state set
        const activeSlotNode = slotRefs.current[selectedSlotIndex];
        const rect = activeSlotNode?.getBoundingClientRect() || { width: 0, height: 0 };

        const { imgWidth, imgHeight } = await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve({ imgWidth: img.naturalWidth, imgHeight: img.naturalHeight });
            img.src = newImgObj;
        });

        setSlots((prevSlots) => {
            const updatedSlots = [...prevSlots];
            const oldSlotData = updatedSlots[selectedSlotIndex];

            if (oldSlotData?.url) {
                URL.revokeObjectURL(oldSlotData.url);
                activeImageUrls.current.delete(oldSlotData.url);
            }

            updatedSlots[selectedSlotIndex] = {
                url: newImgObj,
                imgWidth,
                imgHeight,
                imageAspectRatio: imgWidth / imgHeight,
                slotWidth: rect.width,
                slotHeight: rect.height,
                slotAspectRatio: rect.width / rect.height
            };

            return updatedSlots;
        });

        evt.target.value = '';
        setSelectedSlotIndex(null);
    }, [selectedSlotIndex]);

    // Layout Sync (Keep your existing useEffect for numSlots here...)
    // ... (rest of your sync and cleanup logic)

    return { imgInputRef, slotRefs, slots, handleSlotClick, handleImageUpload };
}
