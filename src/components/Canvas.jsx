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
    // /** @type {React.CSSProperties} */
    // const canvasDimensionsCss = {
    //     '--canvas-width': `${canvasCtx.dimensions.width}px`,
    //     '--canvas-height': `${canvasCtx.dimensions.height}px`
    // }

    // const layoutFamily = canvasCtx.layoutContext.layoutFamilyKey ?? "Family not set";
    // const layout = canvasCtx.layoutContext.layoutKey ?? "Layout not set";

    const layoutCtx = canvasCtx.layoutContext;
    const theLayout = layoutCtx.layoutKey ? baseLayoutData[layoutCtx.layoutKey] : null;

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
                layout={theLayout}
            />
        </div>
    );
}
