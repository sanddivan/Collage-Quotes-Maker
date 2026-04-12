// File: Canvas.jsx

import styles from "./Canvas.module.css";
import baseLayoutData from "../data/base-layouts.json";
import Collage from "./Collage.jsx";

/**
 * @param {Object} props
 * @param {import("../types.js").CanvasContext} props.canvasCtx
 * @returns {React.JSX.Element}
 */

export default function Canvas({ canvasCtx }) {
    const layoutCtx = canvasCtx.layoutContext;

    const layoutFamilyData = layoutCtx.layoutFamilyKey
        ? baseLayoutData[layoutCtx.layoutFamilyKey]
        : null;

    const parsedLayout = layoutFamilyData
        ? parseLayoutData(layoutCtx.layoutKey, layoutFamilyData[layoutCtx.layoutKey])
        : null;

    return (
        <div className={styles.workspace}>
            {/*<div className={styles.theCanvas} style={canvasDimensionsCss}>*/}
            {/*    <p>Hello from the canvas!</p>*/}
            {/*    <p>Layout Family: {layoutFamily}</p>*/}
            {/*    <p>Layout Name: {layout}</p>*/}
            {/*</div>*/}

            <Collage
                canvasDims={canvasCtx.dimensions}
                canvasStyle={styles.theCanvas}
                layoutData={parsedLayout}
            />
        </div>
    );
}

/**
 * @param {string} lName
 * @param {Object[]} lData
 * @returns {import("../types.js").Layout | null}
 */

function parseLayoutData(lName, lData) {
    if (!lName || !lData) {
        return null;
    }

    return {
        name: lName,
        slots: lData.map((slotData) => ({
            id: slotData["slotId"],
            points: slotData["points"],
            imageUrl: null
        }))
    };
}
