import React from "react";

const Sidebar = () => {
    return (
        <div className="bg-gray-300 w-64 h-screen flex flex-col items-center py-4">
            {/* Profile Section */}
            <div className="bg-white w-11/12 flex flex-col items-center py-6 rounded-lg shadow-md mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    {/* User Icon */}
                    <img
                        src="https://robohash.org/Sahil%20Chamoli"
                        alt="Profile"
                        className="w-12 h-12"
                    />
                </div>
                <span className="text-black font-medium">Profile Name</span>
            </div>

            {/* Menu Options */}
            <div className="w-11/12 flex flex-col space-y-4">
                {[
                    { name: "Collaboration", route: "#" },
                    { name: "Mentorship", route: "#" },
                    { name: "Expertise Exchange", route: "#" },
                    { name: "Setting", route: "#" },
                ].map((item, index) => (
                    <button
                        key={index}
                        className="bg-white w-full py-3 text-black text-center font-medium rounded-lg shadow-md hover:bg-gray-100"
                    >
                        {item.name}
                    </button>
                ))}

                {/* Logout Button */}
                <button className="bg-white w-full py-3 text-red-600 text-center font-medium rounded-lg shadow-md hover:bg-red-100">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
