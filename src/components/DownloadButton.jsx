// File: DownloadButton.jsx

import { downloadCollage } from '../hooks/useDownloadCollage.mjs';

/**
 * @param {RefObject<HTMLElement>} canvasRef
 * @returns {React.JSX.Element}
 */

export default function DownloadButton({ canvasRef }) {
    const downloadHandler = async () => {
        await downloadCollage(canvasRef);
    };

    return (
        <div className='dlBtnDiv'>
            <button id="dlBtn" value="Download" onClick={downloadHandler}> Download </button>
        </div>
    );
}
