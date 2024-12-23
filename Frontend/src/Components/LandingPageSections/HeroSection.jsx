import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div
            className="bg-cover bg-center bg-no-repeat  flex items-center justify-center py-32"
            style={{ backgroundImage: "url('/assets/images/HeroBG.png')" }}
        >
            <div className="container mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center">
                {/* Left Content */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-snug">
                        Connecting People Through <br />
                        <span className="text-blue-600">Skills, Mentorship & Collaboration</span>
                    </h1>
                    <p className="mt-4 text-gray-700 text-lg">
                        Join a platform where ideas thrive, partnerships grow, and skills are exchanged seamlessly.
                    </p>
                    <div className="mt-6 flex justify-center lg:justify-start space-x-4">

                        <Link to="/signup">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
                            Get Started
                        </button>
                        </Link>
                        <button className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-blue-100">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Right Side Image */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                    <img
                        src="/assets/images/HeroSection.png"
                        alt="Hero Illustration"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
