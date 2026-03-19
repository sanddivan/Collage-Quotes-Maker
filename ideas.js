/**
 * @param {'width'|'height'} key
 * @param {string|number} value
 */
const updateDimension = useCallback((key, value) => {
    const numericValue = value ? parseInt(String(value), 10) : 0;

    setDimensions(prev => ({
        ...prev,
        [key]: numericValue
    }));
}, []); // Zero dependencies = perfect stability

/**
 * @typedef {Object} CollageDimensions
 * @property {number} width
 * @property {number} height
 */

export function useCollageManager(initialRows, initialCols) {
    // --- State ---
    const [slots, setSlots] = useState(new Array(initialRows * initialCols).fill(null));
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

    const imgInputRef = useRef(null);
    const activeUrls = useRef(new Set());

    // --- Memoized Logic ---

    /**
     * Generic updater for canvas dimensions
     * @type {(key: 'width'|'height', value: string|number) => void}
     */
    const updateDimension = useCallback((key, value) => {
        const num = value ? parseInt(String(value), 10) : 0;
        setDimensions(prev => ({ ...prev, [key]: num }));
    }, []);

    const handleSlotClick = useCallback((index) => {
        setSelectedSlotIndex(index);
        imgInputRef.current?.click();
    }, []);

    const handleImageUpload = useCallback((evt) => {
        const file = evt.target.files[0];
        if (!file || selectedSlotIndex === null) return;

        const newUrl = URL.createObjectURL(file);
        activeUrls.current.add(newUrl);

        setSlots(prev => {
            const next = [...prev];
            if (next[selectedSlotIndex]) {
                URL.revokeObjectURL(next[selectedSlotIndex]);
                activeUrls.current.delete(next[selectedSlotIndex]);
            }
            next[selectedSlotIndex] = newUrl;
            return next;
        });

        evt.target.value = '';
        setSelectedSlotIndex(null);
    }, [selectedSlotIndex]);

    // Cleanup
    useEffect(() => {
        return () => {
            activeUrls.current.forEach(URL.revokeObjectURL);
            activeUrls.current.clear();
        };
    }, []);

    return {
        slots,
        dimensions,
        imgInputRef,
        updateDimension,
        handleSlotClick,
        handleImageUpload
    };
}
