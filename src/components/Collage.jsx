// File: Collage.jsx

import { useSlotsMeasures } from "../hooks/useSlotsMeasures.js";
import styles from "./Collage.module.css";

/**
 * @param {Object} props
 * @param {import("../types.js").Dimensions} props.canvasDims
 * @param {string} props.canvasStyle
 * @param {import("../types.js").Layout} props.layoutData
 * @returns {React.JSX.Element}
 */

export default function Collage({ canvasDims, canvasStyle, layoutData }) {
    /** @type {React.CSSProperties} */
    const canvasDimensionsCss = {
        '--canvas-width': `${canvasDims.width}px`,
        '--canvas-height': `${canvasDims.height}px`
    }

    console.log("In Collage");
    console.log(canvasDims);
    console.log(canvasStyle);
    console.log(layoutData);

    if (!canvasDims || !layoutData) {
        return (<div className={canvasStyle} style={canvasDimensionsCss}></div>);
    }

    console.log(canvasDims);
    console.log(canvasStyle);
    console.log(layoutData);

    // Passing 0 right now as spacing, since that feature hasn't been implemented yet.
    const slotsToRender = useSlotsMeasures(layoutData.slots, 0);

    console.log(slotsToRender);

    return (
        <div className={canvasStyle} style={canvasDimensionsCss}>
            <svg
                viewBox="0 0 100 100"
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

// FIXME: In SvgDefs() and SvgRenders(), the slot id's are being mapped to undefined.

/**
 * @param props
 * @param {Array<import("../types.js").ImageSlot>} props.slotsData
 * @returns {React.JSX.Element}
 */

function SvgDefs({ slotsData }) {
    console.log("In SvgDefs");
    console.log(slotsData);

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
 * @param {Array<import("../types.js").ImageSlot>} props.slotsData
 * @returns {React.JSX.Element}
 */

function SvgRenders({ slotsData }) {
    console.log("In SvgRenders");
    console.log(slotsData);

    return (
        <>
            {slotsData.map((slot) => {
                // FIXME: The "key" attribute has to be passed directly because...
                //        because React :/

                const imgAttrs = {
                    key: `img-${slot.id}`,
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
                    vectorEffect: "non-scaling-stroke",
                    className: styles.shardBorder
                }

                return (
                    <g key={slot.id} className={styles.shardGroup}>
                        <image {...imgAttrs} />
                        <polygon
                            {...borderAttrs}
                            onClick={() => console.log(`Slot ${slot.id} clicked!`)}
                        />
                    </g>
                );
            })}
        </>
    )
}
