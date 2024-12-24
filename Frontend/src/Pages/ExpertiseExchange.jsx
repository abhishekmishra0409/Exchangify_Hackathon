import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersBySkills } from "../features/User/userSlice";
import { createExchange } from "../features/Exchange/exchangeSlice";

const ExpertiseExchange = () => {
    const dispatch = useDispatch();

    const [selectedSkill, setSelectedSkill] = useState("");
    const [showExchangeModal, setShowExchangeModal] = useState(false);
    const [exchangeMessage, setExchangeMessage] = useState("Let's exchange our expertise!");
    const [exchangeUserId, setExchangeUserId] = useState(null);
    const [exchangeDetails, setExchangeDetails] = useState({
        exchangeType: "skill",
        requesterSkills: [],
        responderSkills: [],
        monetaryExchange: 0,
        projectExchange: "",
    });

    // Fetch users from Redux
    const { users, isLoading: isUsersLoading, isError: isUsersError, message: usersMessage } = useSelector(
        (state) => state.user
    );

    // Handle input changes for the exchange form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "exchangeType") {
            // Ensure the exchangeType is one of the valid enum values ('skill', 'money', 'project')
            setExchangeDetails((prev) => ({ ...prev, exchangeType: value }));
        } else {
            setExchangeDetails((prev) => ({ ...prev, [name]: value }));
        }
    };


    // Handle skill selection
    const handleSkillChange = (e) => {
        const { name, options } = e.target;
        const selectedValues = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);
        setExchangeDetails((prev) => ({ ...prev, [name]: selectedValues }));
    };

    // Fetch users when skill is selected
    useEffect(() => {
        if (selectedSkill) {
            dispatch(getUsersBySkills(selectedSkill));
        }
    }, [dispatch, selectedSkill]);

    const openExchangeModal = (userId) => {
        setExchangeUserId(userId);
        setShowExchangeModal(true);
    };

    const closeExchangeModal = () => {
        setShowExchangeModal(false);
        setExchangeMessage("Let's exchange our expertise!");
        setExchangeUserId(null);
        setExchangeDetails({
            exchangeType: "skills",
            requesterSkills: [],
            responderSkills: [],
            monetaryExchange: 0,
            projectExchange: "",
        });
    };

    const sendExchangeRequest = () => {
        const exchangePayload = {
            responder: exchangeUserId,
            exchangeType: exchangeDetails.exchangeType,
            requesterSkills: exchangeDetails.requesterSkills,
            responderSkills: exchangeDetails.responderSkills,
            monetaryExchange: exchangeDetails.monetaryExchange,
            projectExchange: exchangeDetails.projectExchange,
        };
        console.log(exchangePayload)

        dispatch(createExchange(exchangePayload)).then(() => {
            alert(`Exchange request sent successfully to user ID: ${exchangeUserId}`);
            closeExchangeModal();
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">Expertise Exchange</h1>

                {/* Service (Skill) Selection */}
                <div className="mt-6">
                    <label htmlFor="skill-select" className="block font-bold mb-2">
                        Select a service to exchange:
                    </label>
                    <select
                        id="skill-select"
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="border rounded-md p-2 w-full"
                    >
                        <option value="">-- Select a Service --</option>
                        {[
                            "uiux",
                            "software_developer",
                            "graphic_designer",
                            "copywriting",
                            "web_development",
                            "application_development",
                            "data_science",
                            "machine_learning",
                            "blockchain",
                            "cloud_computing",
                            "video_editing",
                            "animation",
                            "content_writing",
                            "socialmedia_management",
                            "seo_expert",
                        ].map((skill) => (
                            <option key={skill} value={skill}>
                                {skill.replace("_", " ").toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Users Display */}
                <h2 className="text-xl font-bold mt-6">
                    Users offering: {selectedSkill ? selectedSkill.replace("_", " ") : "None"} (
                    {users?.length || 0})
                </h2>
                {isUsersLoading ? (
                    <p>Loading users...</p>
                ) : isUsersError ? (
                    <p className="text-red-500">Error: {usersMessage}</p>
                ) : users?.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {users.map((user) => (
                            <li key={user._id} className="flex justify-between items-center">
                                <span>
                                    {user.name} ({user.skills.join(", ")})
                                </span>
                                <button
                                    onClick={() => openExchangeModal(user._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Exchange
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users found for the selected service.</p>
                )}

                {/* Exchange Modal */}
                {showExchangeModal && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-md w-96">
                            <h2 className="text-xl font-bold mb-4">Create Exchange Request</h2>
                            <form>
                                <label className="block font-bold mb-2">Exchange Type:</label>
                                <select
                                    name="exchangeType"
                                    value={exchangeDetails.exchangeType}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2 mb-4"
                                >
                                    <option value="skill">Skills</option>
                                    <option value="money">Monetary</option>
                                    <option value="project">Project</option>
                                </select>


                                <label className="block font-bold mb-2">Your Skills:</label>
                                <select
                                    name="requesterSkills"
                                    multiple
                                    value={exchangeDetails.requesterSkills}
                                    onChange={handleSkillChange}
                                    className="w-full border rounded-md p-2 mb-4"
                                >
                                    {[
                                        "uiux",
                                        "software_developer",
                                        "graphic_designer",
                                        "copywriting",
                                        "web_development",
                                        "application_development",
                                        "data_science",
                                        "machine_learning",
                                        "blockchain",
                                        "cloud_computing",
                                        "video_editing",
                                        "animation",
                                        "content_writing",
                                        "socialmedia_management",
                                        "seo_expert",
                                    ].map((skill) => (
                                        <option key={skill} value={skill}>
                                            {skill.replace("_", " ").toUpperCase()}
                                        </option>
                                    ))}
                                </select>

                                <label className="block font-bold mb-2">Responder's Skills:</label>
                                <select
                                    name="responderSkills"
                                    multiple
                                    value={exchangeDetails.responderSkills}
                                    onChange={handleSkillChange}
                                    className="w-full border rounded-md p-2 mb-4"
                                >
                                    {[
                                        "uiux",
                                        "software_developer",
                                        "graphic_designer",
                                        "copywriting",
                                        "web_development",
                                        "application_development",
                                        "data_science",
                                        "machine_learning",
                                        "blockchain",
                                        "cloud_computing",
                                        "video_editing",
                                        "animation",
                                        "content_writing",
                                        "socialmedia_management",
                                        "seo_expert",
                                    ].map((skill) => (
                                        <option key={skill} value={skill}>
                                            {skill.replace("_", " ").toUpperCase()}
                                        </option>
                                    ))}
                                </select>

                                {exchangeDetails.exchangeType === "monetary" && (
                                    <>
                                        <label className="block font-bold mb-2">Monetary Value:</label>
                                        <input
                                            type="number"
                                            name="monetaryExchange"
                                            value={exchangeDetails.monetaryExchange}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md p-2 mb-4"
                                        />
                                    </>
                                )}

                                {exchangeDetails.exchangeType === "project" && (
                                    <>
                                        <label className="block font-bold mb-2">Project Details:</label>
                                        <textarea
                                            name="projectExchange"
                                            value={exchangeDetails.projectExchange}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="w-full border rounded-md p-2 mb-4"
                                        ></textarea>
                                    </>
                                )}

                                <div className="flex justify-end mt-4">
                                    <button
                                        type="button"
                                        onClick={closeExchangeModal}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={sendExchangeRequest}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpertiseExchange;
