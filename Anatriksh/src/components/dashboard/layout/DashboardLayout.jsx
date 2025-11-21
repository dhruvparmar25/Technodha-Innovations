import React from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSlider from "./DashboardSlider";

function DashboardLayout() {
    return (
        <div>
            <DashboardHeader />
            <DashboardSlider />
            <main className="content-area">
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;
