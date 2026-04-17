// File: Canvas.jsx

// Have a component in charge of fetching this data rather than have said fetch
// scattered all over the place.

import styles from "./Canvas.module.css";
import baseLayoutData from "../data/base-layouts.json";
import shapes from "../data/shapes.json";

/**
 * @returns {React.JSX.Element}
 */

export default function Canvas() {
    const layout = '2x2';
    const layoutDesc = baseLayoutData[layout];
    const theSlots = layoutDesc['slots'];

    return (
        <div className={styles.theCanvas}>
            <h1>The Slots!</h1>

            {theSlots.map((sData) => (
                <ol>
                    {Object.keys(sData).map((key) => (
                        <li key={key}>{key} - {sData[key]}</li>
                    ))}
                </ol>
            ))}

            {/*<svg viewBox="0 0 1 1" preserveAspectRatio="none">*/}
            {/*</svg>*/}
        </div>
    );
}
