import React from "react";

function DashboardHeader() {
    return (
        <header className="app-header">
            <div className="header-left">
                <img src="/logo.png" alt="logo" className="das-logo" />
            </div>

            <div className="header-right">
                <img src="/Notification-icon.png" className="notification" />

                <div className="user">
                    <img src="/user-icon.png" className="user-img" />
                    <div className="user-info">
                        <h5>Dr Ayush Mehta</h5>
                        <p>Cardiologist</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;
