const ExpertiseSection = () => {
    return (
        <div
            className="bg-cover bg-center bg-no-repeat py-32 px-4"
            style={{ backgroundImage: "url('/assets/images/ExpertiseBg.png')" }}
        >
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-12">
                    Our<span className="text-blue-600"> Top </span>Expertise To Exchange
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className={`bg-white shadow-md rounded-lg p-10 flex flex-col items-center ${category.bgColor}`}
                        >
                            <div
                                className={`h-16 w-16 flex items-center justify-center rounded-full mb-4 bg-white`}
                            >
                                <img src={category.icon} alt={category.name} className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const categories = [
    {
        name: "Business Management",
        icon: "/assets/icon/BusinessManagement.svg",
        bgColor: "bg-green-100",
    },
    {
        name: "Arts & Design",
        icon: "/assets/icon/arts-design.svg",
        bgColor: "bg-pink-100",
    },
    {
        name: "Personal Development",
        icon: "/assets/icon/personal-development.svg",
        bgColor: "bg-teal-100",
    },
    {
        name: "IT & Software",
        icon: "/assets/icon/it-software.svg",
        bgColor: "bg-yellow-100",
    },
    {
        name: "Health & Fitness",
        icon: "/assets/icon/health-fitness.svg",
        bgColor: "bg-purple-100",
    },
    {
        name: "Computer Science",
        icon: "/assets/icon/computer-science.svg",
        bgColor: "bg-indigo-100",
    },
    {
        name: "Video & Photography",
        icon: "/assets/icon/video-photography.svg",
        bgColor: "bg-blue-100",
    },
    {
        name: "Digital Marketing",
        icon: "/assets/icon/digital-marketing.svg",
        bgColor: "bg-red-100",
    },
];

export default ExpertiseSection;
