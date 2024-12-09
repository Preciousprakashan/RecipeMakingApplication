import React, { useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import './CopyToClipboard.css';

const CopyToClipboard = ({ targetSelector }) => {
    const [copyMessage, setCopyMessage] = useState(false);

    const handleCopy = () => {
        const element = document.querySelector(targetSelector);
        if (element) {
            const text = element.innerText || element.textContent;
            navigator.clipboard.writeText(text)
                .then(() => {
                    setCopyMessage(true);
                    setTimeout(() => setCopyMessage(false), 3000); // Hide popup after 3 seconds
                })
                .catch(err => {
                    console.error("Failed to copy text: ", err);
                });
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button 
                onClick={handleCopy} 
                className="copy-button"
                aria-label="Copy to clipboard"
            >
                <FaClipboard size={20} />
            </button>
            {copyMessage && (
                <div className="copy-popup">
                    Instructions copied to clipboard!
                </div>
            )}
        </div>
    );
};

export default CopyToClipboard;
