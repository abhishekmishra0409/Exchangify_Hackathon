import React from "react";

const SkillExchangeSection = () => {
    return (
        <div
            className="relative bg-cover bg-center py-16 px-6 lg:px-48"
            style={{
                backgroundImage: "url('/assets/images/ExchangeBg.png')",
            }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
                {/* Left Content Section */}
                <div>
                    <h2 className="text-4xl font-bold leading-tight text-gray-900">
                        Exchange <span className="text-blue-600">Expertise</span>, Achieve
                        Excellence
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Grow faster by sharing your skills with others. Whether it’s tech,
                        art, or strategy, skill exchange helps you achieve your goals while
                        helping others succeed.
                    </p>
                </div>

                {/* Right Image Section */}
                <div className="relative">
                    {/* Main Images */}
                    <div className="relative flex flex-col items-center gap-4">
                        {/* Top Image */}
                        <img
                            src="/assets/images/faq-1.png"
                            alt="Person Thinking"
                            className="rounded-lg shadow-lg w-48 lg:w-56 relative -right-40  -bottom-20"
                        />
                        {/* Bottom Image */}
                        <img
                            src="/assets/images/faq-2.png"
                            alt="Team Discussion"
                            className="rounded-lg shadow-lg w-64 lg:w-80 relative right-0 -translate-y-6"
                        />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default SkillExchangeSection;
