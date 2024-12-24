import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/User/userSlice.js";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import Header from "../Common/Header.jsx";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user data and token from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Dispatch logout action
        dispatch(logout());

        // Redirect to login page
        navigate("/login");
    };

    return (
        <div>
            {/* Header Section */}
            <Header/>

            {/* Main Dashboard Layout */}
            <div className="fixed top-18 left-0 w-full h-full flex bg-gray-300">
                {/* Sidebar Section */}
                <div className="bg-gray-300 w-80 h-screen flex flex-col items-center py-4">
                    {/* Profile Section with Link */}
                    <NavLink
                        to="/dashboard/profile"
                        className="bg-white w-11/12 flex flex-col items-center py-6 rounded-lg shadow-md mb-2 hover:cursor-pointer"
                    >
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            {/* User Icon */}
                            <img
                                src="https://robohash.org/Sahil%20Chamoli"
                                alt="Profile"
                                className="w-12 h-12"
                            />
                        </div>
                        <span className="text-black font-medium">Profile Name</span>
                    </NavLink>

                    {/* Menu Options */}
                    <div className="w-11/12 flex flex-col space-y-2">
                        {[
                            { name: "Home", route: "/dashboard" },
                            { name: "Collaboration", route: "/dashboard/collaboration" },
                            { name: "Create Post", route: "/dashboard/create-post" },
                            { name: "Expertise Exchange", route: "/dashboard/expertise-exchange" },
                            { name: "Update Details", route: "/dashboard/update-details" },
                        ].map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.route}
                                end={item.route === "/dashboard"} // Add `end` for Home route
                                className={({ isActive }) =>
                                    `bg-white w-full py-4 text-center font-medium rounded-lg shadow-md ${
                                        isActive ? "bg-gray-200" : "hover:bg-gray-100"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="bg-white w-full py-3 text-red-600 text-center font-medium rounded-lg shadow-md hover:bg-red-100"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="p-5 w-full h-full overflow-y-scroll">
                    <div className="p-5  rounded-lg w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
