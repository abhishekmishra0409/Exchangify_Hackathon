import React from "react";
import WhySectionCards from "./WhySectionCards";

const WhySection = () => {
    return (
        <div
            className=" bg-cover bg-center py-24 px-48"
        >
            <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-500 ">Why Choose <span className="text-blue-600 ">Xchangify</span> ?</h2>
            </div>
            <div>
                <WhySectionCards />
            </div>
        </div>
    );
};

export default WhySection;
