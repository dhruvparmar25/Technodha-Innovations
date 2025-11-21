import React, { useEffect } from "react";

const AlertBox = ({ type = "success", message, onClose }) => {
    if (!message) return null;

    // Autohide after 3 sec
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className={`custom-alert alert-${type}`}>
            <div className="alert-content">
                <span>{message}</span>
                <button className="alert-close-btn" onClick={onClose}>
                    ×
                </button>
            </div>
        </div>
    );
};

export default AlertBox;
