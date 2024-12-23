import React from 'react'
import { Link } from 'react-router-dom';

const Collaboration = () => {
    const [activeTab, setActiveTab] = React.useState('proposals'); // 'proposals' or 'requests'

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-6">
                {/* Main Content */}
                <div className="space-y-6">
                    {/* Collaboration Box */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4">Start Collaboration</h3>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center">
                                <span className="mr-2">⭐</span>
                                For Collaboration, you have to create a proposal first
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">⭐</span>
                                Create a proposal
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">⭐</span>
                                Send it to the required skilled persons
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">⭐</span>
                                Accept and reject collab requests as per your requirements
                            </li>
                        </ul>
                        <Link to="/dashboard/create-proposal">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors duration-200">
                                Create Your Proposal 🚀
                            </button>
                        </Link>
                    </div>

                    {/* Teams Box */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h4 className="text-blue-600 text-lg font-bold mb-3">Your Teams</h4>
                        <p className="text-gray-500">No Collaborations Yet</p>
                    </div>

                    {/* Tabs */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            className={`border rounded-md py-2 px-4 transition-colors duration-200 
                ${activeTab === 'proposals'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-gray-100 hover:bg-gray-200 border-gray-300'}`}
                            onClick={() => setActiveTab('proposals')}
                        >
                            Sended Proposals
                        </button>
                        <button
                            className={`border rounded-md py-2 px-4 transition-colors duration-200 
                ${activeTab === 'requests'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-gray-100 hover:bg-gray-200 border-gray-300'}`}
                            onClick={() => setActiveTab('requests')}
                        >
                            Collab Requests
                        </button>
                    </div>

                    {/* Proposals Section */}
                    {activeTab === 'proposals' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h4 className="text-lg font-bold mb-4">Your Sent Proposals</h4>
                            <div className="space-y-4">
                                {/* Example proposal card - Replace with your data mapping */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h5 className="font-semibold">Project Title</h5>
                                            <p className="text-sm text-gray-600 mt-1">Looking for React Developer</p>
                                            <p className="text-xs text-gray-500 mt-2">Sent on: 01/01/2024</p>
                                        </div>
                                        <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Requests Section */}
                    {activeTab === 'requests' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h4 className="text-lg font-bold mb-4">Collaboration Requests</h4>
                            <div className="space-y-4">
                                {/* Example request card - Replace with your data mapping */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h5 className="font-semibold">Frontend Developer Needed</h5>
                                            <p className="text-sm text-gray-600 mt-1">From: John Doe</p>
                                            <p className="text-xs text-gray-500 mt-2">Received: 01/01/2024</p>
                                        </div>
                                        <div className="space-x-2">
                                            <button className="px-3 py-1 text-sm rounded-md bg-green-600 text-white hover:bg-green-700">
                                                Accept
                                            </button>
                                            <button className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    )
}

export default Collaboration