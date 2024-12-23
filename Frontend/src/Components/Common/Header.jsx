import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    // Check if there is a token in session storage
    const token = localStorage.getItem('token');
    // console.log(token);

    return (
        <>
            <nav className="flex items-center justify-between py-4 px-28 shadow-md bg-white">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src={"/assets/Logo.svg"} alt={"Logo"} />
                </div>

                {/* Navigation Links */}
                <div className={"flex items-center justify-between"}>
                    <div className="flex items-center space-x-6 px-28">
                        {/* Articles */}
                        <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                            <img src={"/assets/icon/Article.svg"} alt={"Articles"} />
                            <span className="text-sm">Articles</span>
                        </div>

                        {/* Services */}
                        <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                            <img src={"/assets/icon/Service.svg"} alt={"Services"} />
                            <span className="text-sm">Services</span>
                        </div>

                        {/* Collaboration */}
                        <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                            <img src={"/assets/icon/collaboration.svg"} alt={"Collaboration"} />
                            <span className="text-sm">Collaboration</span>
                        </div>

                        {/* Mentorship */}
                        <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer">
                            <img src={"/assets/icon/mentor.svg"} alt={"Mentorship"} />
                            <span className="text-sm">Mentorship</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center space-x-6">
                        {!token ? ( // Check if the token exists
                            <>
                                <Link to="/signup">
                                    <button className="text-gray-500 hover:text-black">Join now</button>
                                </Link>
                                <Link to="/login">
                                    <button
                                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-3xl hover:bg-blue-600 hover:text-white">
                                        Sign in
                                    </button>
                                </Link>
                            </>
                        ) : null}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;