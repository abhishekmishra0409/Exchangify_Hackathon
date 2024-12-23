import React from "react";
import { Link } from "react-router-dom";

const WelcomeSection = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-96 px-6 lg:px-20 bg-white py-24">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-800">
                    Welcome to{" "}
                    <span className="text-blue-600">Exchangify</span>
                </h1>
                <div className="flex flex-col mt-8 space-y-4 w-96 ">
                    {/* Buttons */}

                    <Link to="/login">
                    <button className="w-full lg:w-auto bg-transparent border border-gray-400 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-100">
                        Already have an account? <span className="text-blue-600">Login</span>
                    </button>
                    </Link>

                    <Link to="/signup">
                    <button className="w-full lg:w-auto bg-gray-100 border border-gray-400 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200">
                        Sign in with email
                    </button>
                    </Link>
                </div>
                {/* Policy Text */}
                <p className="mt-4 text-gray-500 text-sm w-96">
                    By clicking Continue to join or sign in, you agree to Xchangify's{" "}
                    <a
                        href="#"
                        className="text-blue-600 hover:underline"
                    >
                        User Agreement
                    </a>
                    ,{" "}
                    <a
                        href="#"
                        className="text-blue-600 hover:underline"
                    >
                        Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                        href="#"
                        className="text-blue-600 hover:underline"
                    >
                        Cookie Policy
                    </a>
                    .
                </p>
            </div>

            {/* Right Image */}
            <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
                <img
                    src="/assets/images/Welcome.png"
                    alt="Working Illustration"
                    className="max-w-full h-auto"
                />
            </div>
        </div>
    );
};

export default WelcomeSection;
