import React from "react";

const WhySection = () => {
    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Why Choose <span className="text-blue-600">Xchangify</span>?
                </h2>

                {/* Cards Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-gray-100 rounded-lg shadow-md p-12 text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Exchange Expertise
                        </h3>
                        <p className="text-gray-600">
                            Trade your skills and services with ease. Whether you're a coder
                            or a graphic designer, Xchangify makes collaboration seamless and
                            mutually beneficial.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-100 rounded-lg shadow-md p-12 text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Collaboration
                        </h3>
                        <p className="text-gray-600">
                            Trade your skills and services with ease. Whether you're a coder
                            or a graphic designer, Xchangify makes collaboration seamless and
                            mutually beneficial.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-100 rounded-lg shadow-md p-12 text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Mentorship
                        </h3>
                        <p className="text-gray-600">
                            Trade your skills and services with ease. Whether you're a coder
                            or a graphic designer, Xchangify makes collaboration seamless and
                            mutually beneficial.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhySection;
