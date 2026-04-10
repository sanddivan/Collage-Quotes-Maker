// File: useLayoutContext.js

import { useState } from "react";

/**
 * @returns {import("../types.js").LayoutContext}
 */
export function useLayoutContext() {
    const [familyKey, setFamilyKey] = useState(null);
    const [layoutKey, setLayoutKey] = useState(null);

    return {
        layoutFamilyKey: familyKey,
        setLayoutFamilyKeyAction: setFamilyKey,
        layoutKey: layoutKey,
        setLayoutKeyAction: setLayoutKey
    }
}
