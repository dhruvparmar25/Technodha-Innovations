import React from "react";
import { NavLink } from "react-router-dom";
import {
    IoHomeOutline,
    IoPeopleOutline,
    IoFlaskOutline,
    IoDocumentTextOutline,
    IoNotificationsOutline,
    IoSettingsOutline,
    IoKeyOutline,
} from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";

function DashboardSidebar() {
    //  THIS IS THE MENU VARIABLE YOU ASKED FOR
    const menuItems = [
        { title: "Dashboard", path: "/dashboard", icon: <MdOutlineSpaceDashboard /> },
        { title: "Patients", path: "/patients", icon: <IoPeopleOutline /> },
        { title: "Access Requests", path: "/access-requests", icon: <IoKeyOutline /> },
        { title: "Lab Orders", path: "/lab-orders", icon: <IoFlaskOutline /> },
        { title: "Reports", path: "/reports", icon: <IoDocumentTextOutline /> },
        { title: "Notifications", path: "/notifications", icon: <IoNotificationsOutline /> },
        { title: "Settings", path: "/settings", icon: <IoSettingsOutline /> },
    ];

    return (
        <aside className="sidebar">
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <NavLink to={item.path} className="nav-item">
                            <span className="icon">{item.icon}</span>

                            <span className="title-slider">{item.title}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default DashboardSidebar;
