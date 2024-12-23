import React from 'react';

function Header() {
    return (
        <>
            <nav className="flex items-center justify-between py-4 px-28 shadow-md bg-white">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src={"/assets/Logo.svg"} alt={"Logo"}/>
                </div>

                {/* Navigation Links */}
                <div className={"flex items-center justify-between"}>
                <div className="flex items-center space-x-6 px-28">
                    {/* Articles */}
                    <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                        <img src={"/assets/icon/Article.svg"} alt={"Logo"}/>
                        <span className="text-sm">Articles</span>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                        <img src={"/assets/icon/Service.svg"} alt={"Logo"}/>
                        <span className="text-sm">Services</span>
                    </div>

                    {/* Collaboration */}
                    <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                        <img src={"/assets/icon/collaboration.svg"} alt={"Logo"}/>
                        <span className="text-sm">Collaboration</span>
                    </div>

                    {/* Mentorship */}
                    <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                        <img src={"/assets/icon/mentor.svg"} alt={"Logo"}/>
                        <span className="text-sm">Mentorship</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-6">
                    <button className="text-gray-500 hover:text-black">Join now</button>
                    <button
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-3xl hover:bg-blue-600 hover:text-white">
                        Sign in
                    </button>
                </div>
                </div>
            </nav>
        </>
    );
}

export default Header;