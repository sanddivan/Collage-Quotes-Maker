// File: Collage.jsx

import { useContentMeasurements } from "../hooks/useContentMeasurements.js";
import styles from "./Collage.module.css";

// BIG TODO: We're going to need to classify the different types of shards/slots
//           somehow because we also need their centers for the placeholders.
//           And maybe for implementing spacing as well.

/**
 * @param {Object} props
 * @param {import("../types/canvasTypes.js").Dimensions} props.canvasDims
 * @param {string} props.canvasStyle
 * @param {import("../types/layoutTypes.js").Layout} props.layoutData
 * @returns {React.JSX.Element}
 */

export default function Collage({ canvasDims, canvasStyle, layoutData }) {
    if (!canvasDims) {
        return (<div></div>);
    }

    /** @type {React.CSSProperties} */
    const canvasDimensionsCss = {
        '--canvas-width': `${canvasDims.width}px`,
        '--canvas-height': `${canvasDims.height}px`
    }

    if (!layoutData) {
        return (<div className={canvasStyle} style={canvasDimensionsCss}></div>);
    }

    // Passing 0 right now as spacing, since that feature hasn't been implemented yet.
    const slotsToRender = useContentMeasurements(canvasDims, layoutData.slots, 0);
    const svgViewBox = `0 0 ${canvasDims.width} ${canvasDims.height}`;

    return (
        <div className={canvasStyle} style={canvasDimensionsCss}>
            <svg
                viewBox={svgViewBox}
                width="100%"
                height="100%"
                style={{ display: "block" }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <SvgDefs slotsData={slotsToRender} />
                <SvgRenders slotsData={slotsToRender} />
            </svg>
        </div>
    );
}

/**
 * @param props
 * @param {import("../types/slotTypes.js").ImageSlot[]} props.slotsData
 * @returns {React.JSX.Element}
 */

function SvgDefs({ slotsData }) {
    return (
        <defs>
            {slotsData.map((slot) => {
                const pointsAsStr = slot.points
                    .map(pt => `${pt.x} ${pt.y}`)
                    .join(', ');

                return (
                    <clipPath key={`clip-key-${slot.id}`} id={`clip-id-${slot.id}`}>
                        <polygon points={pointsAsStr} />
                    </clipPath>
                );
            })}
        </defs>
    )
}

/**
 * @param props
 * @param {import("../types/slotTypes.js").ImageSlot[]} props.slotsData
 * @returns {React.JSX.Element}
 */

function SvgRenders({ slotsData }) {
    return (
        <>
            {slotsData.map((slot) => {
                const imgAttrs = {
                    width: "100",
                    height: "100",
                    clipPath: `url(#clip-id-${slot.id})`,
                    preserveAspectRatio: "xMidYMid slice"
                };

                if (slot.imageUrl) {
                    imgAttrs['href'] = slot.imageUrl;
                }

                const borderAttrs = {
                    points: slot.points.map(pt => `${pt.x} ${pt.y}`).join(', '),
                    fill: "transparent",
                    stroke: "#0000FF", // Using "blue" to easily identify it for now.
                    strokeWidth: "1", // Placeholder too.
                    vectorEffect: "non-scaling-stroke"
                }

                return (
                    <g key={slot.id} className={styles.slot}>
                        {/*FIXME: The placeholder text is not showing.*/}
                        {slot.imageUrl ? (
                            <image key={`img-${slot.id}`} {...imgAttrs} />
                        ) : (
                            <div className={styles.placeholder}>
                                <p>Click to Add Image!</p>
                            </div>
                        )}
                        <polygon
                            {...borderAttrs}
                            onClick={() => console.log(`Slot ${slot.id} clicked!`)}
                        />
                    </g>
                );
            })}
        </>
    );
}
