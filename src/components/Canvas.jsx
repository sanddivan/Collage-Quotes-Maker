// File: Canvas.jsx

// Have a component in charge of fetching this data rather than have said fetch
// scattered all over the place.

import styles from "./Canvas.module.css";

/** @typedef {import("../types/canvasTypes.js").CanvasContext} T_CanvasContext */
/** @typedef {import("../types/layoutTypes.js").LayoutContext} T_LayoutContext */

/**
 * @param props
 * @param {T_CanvasContext} props.canvasCtx
 * @param {T_LayoutContext} props.layoutCtx
 * @returns {React.JSX.Element}
 */

export default function Canvas({ canvasCtx, layoutCtx }) {
    /** @type {React.CSSProperties} */
    const dimsCSS = {
        '--canvas-width': `${canvasCtx.width}px`,
        '--canvas-height': `${canvasCtx.height}px`
    }

    const layoutSlots = layoutCtx.slots;
    console.log(layoutSlots);

    return (
        <div className={styles.workspace}>
            <div className={styles.theCanvas} style={dimsCSS}>
                {/*<h1>The Slots!</h1>*/}

                {/*{slotsData.map((sData) => (*/}
                {/*    <ol>*/}
                {/*        {Object.keys(sData).map((key) => (*/}
                {/*            <li key={key}>{key} - {sData[key]}</li>*/}
                {/*        ))}*/}
                {/*    </ol>*/}
                {/*))}*/}

                {/*{theSlots.map((slot, index) => (*/}
                {/*    <div>*/}
                {/*        <h2>Slot {index + 1}!</h2>*/}
                {/*        <p><strong>Center:</strong> &#123; x: {slot.center.x}, y: {slot.center.y} &#125;</p>*/}

                {/*        <h3>Vertices:</h3>*/}

                {/*        <ul>*/}
                {/*            {slot.vertices.map((vertex) => (*/}
                {/*                <li>&#123; x: {vertex.x}, y: {vertex.y} &#125;</li>*/}
                {/*            ))}*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*))}*/}

                {/*<svg viewBox="0 0 1 1" preserveAspectRatio="none">*/}
                {/*</svg>*/}
            </div>
        </div>
    );
}
