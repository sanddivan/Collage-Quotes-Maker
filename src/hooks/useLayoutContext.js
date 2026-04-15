// File: useLayoutContext.js

import { useState } from "react";
import baseLayoutData from "../data/base-layouts.json";

/**
 * @returns {import("../types/layoutTypes.js").LayoutContext}
 */

export function useLayoutContext() {
    const [familyKey, setFamilyKey] = useState(null);
    const [layoutKey, setLayoutKey] = useState(null);

    const currLayoutFamily = familyKey ? baseLayoutData[familyKey] : null;
    const currLayout = currLayoutFamily ? currLayoutFamily[layoutKey] : null;

    return {
        layoutFamilyKey: familyKey,
        setLayoutFamilyKeyAction: setFamilyKey,
        layoutKey: layoutKey,
        setLayoutKeyAction: setLayoutKey,
        layoutFamily: currLayoutFamily,
        layout: currLayout
    }
}
