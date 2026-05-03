// File: Canvas.jsx

// Have a component in charge of fetching this data rather than have said fetch
// scattered all over the place.

import styles from "./Canvas.module.css";
import ImageSlot from "./ImageSlot.jsx";

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

    if (!layoutSlots) {
        return (
            <div className={styles.workspace}>
                <div className={styles.theCanvas} style={dimsCSS}>
                </div>
            </div>
        );
    }

    // FIXME: I think we have to convert the viewBox to 0 0 100 100, and then
    //        use literal percentages for the slots. Don't forget the "%" sign!

    return (
        <div className={styles.workspace}>
            <div className={styles.theCanvas} style={dimsCSS}>
                <svg viewBox="0 0 1 1" preserveAspectRatio="none">
                    {layoutSlots.map((slot) => (
                        <ImageSlot key={slot.id} slotData={slot} />
                    ))}
                </svg>

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
            </div>
        </div>
    );
}
