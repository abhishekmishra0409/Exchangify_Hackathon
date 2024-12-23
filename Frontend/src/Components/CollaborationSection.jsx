import React from "react";

const CollaborationSection = () => {
    return (
        <div
            className="bg-[url('/assets/images/CollabrationBg.png')] bg-cover bg-center py-24 px-48"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Image Section */}
                <div className="relative">

                    <img
                        src="/assets/images/about-1.png"
                        alt="Group Collaboration"
                        className="rounded-lg shadow-lg w-9/12"
                    />
                    <img
                        src="/assets/images/about-2.png"
                        alt="Study Session"
                        className="rounded-lg shadow-lg w-1/2 absolute bottom-0 right-0 transform translate-x-4 translate-y-4"
                    />
                </div>

                {/* Right Content Section */}
                <div className={"mx-6"} >
                    <h2 className="text-3xl font-bold">
                        Platform Where <span className="text-blue-600">Collaboration</span>{" "}
                        That Drives Results
                    </h2>
                    <p className="mt-4">
                        Bring your ideas to life with the power of teamwork. Whether you're
                        looking for a partner to build your dream app or a designer to
                        enhance your project, our collaboration feature connects you with
                        the right people to share ideas, split tasks, and achieve success
                        together.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CollaborationSection;
