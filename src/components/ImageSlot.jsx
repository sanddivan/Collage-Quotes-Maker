// File: ImageSlot.jsx

import styles from "./ImageSlot.module.css";

/** @typedef {import("../types/layoutTypes.js").LayoutSlot} T_LayoutSlot */

/**
 * @param props
 * @param {T_LayoutSlot} props.slotData
 * @returns {React.JSX.Element}
 */

export default function ImageSlot({ slotData }) {
    const points = slotData.vertices.map(pt => `${pt.x},${pt.y}`).join(' ');

    // TODO: Add Frame Color and Frame Width to the LayoutSlot objects.

    return (
        <g className={styles.slot}>
            <defs>
                <clipPath id={`clip-slot-${slotData.id}`}>
                    <polygon points={points} />
                </clipPath>
            </defs>

            {slotData.imageUrl ? (
                <image
                    href={slotData.imageUrl}
                    x="0"
                    y="0"
                    width="1"
                    height="1"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#clip-slot-${slotData.id})`}
                />
            ) : (
                <p className={styles.placeholder}>Click to Add Image!</p>
            )}

            <polygon
                points={points}
                fill="none"
                stroke="#0000FF"
                strokeWidth="3px"
            />
        </g>
    )
}
