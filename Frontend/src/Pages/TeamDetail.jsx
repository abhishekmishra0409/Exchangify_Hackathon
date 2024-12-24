import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsersBySkills } from '../features/User/userSlice';
import { getTeamById } from '../features/Collab/collabSlice';
import { sendInvite, getInvitesByTeamId } from '../features/Invite/inviteSlice';

const TeamDetail = () => {
    const { teamId } = useParams();
    const dispatch = useDispatch();

    const [selectedSkill, setSelectedSkill] = useState('');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteMessage, setInviteMessage] = useState('Join our awesome collab team!');
    const [inviteeId, setInviteeId] = useState(null);
    const [sentRequests, setSentRequests] = useState([]);
    const [sentInvites, setSentInvites] = useState(new Set());


    const skills = [
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
    ];

    const { teamDetail, isLoading: isTeamLoading, isError: isTeamError, message: teamMessage } = useSelector((state) => state.collab);
    const { users, isLoading: isUsersLoading, isError: isUsersError, message: usersMessage } = useSelector((state) => state.user);
    const { isLoading: isInviteLoading, message: inviteResponse, teamInvites } = useSelector((state) => state.invite);

    useEffect(() => {
        if (teamId) {
            dispatch(getTeamById(teamId));
            dispatch(getInvitesByTeamId(teamId));
        }
    }, [dispatch, teamId]);

    useEffect(() => {
        if (selectedSkill) {
            dispatch(getUsersBySkills(selectedSkill));
        }
    }, [dispatch, selectedSkill]);

    const handleSkillChange = (e) => setSelectedSkill(e.target.value);

    const openInviteModal = (receiverId) => {
        setInviteeId(receiverId);
        setShowInviteModal(true);
    };

    const closeInviteModal = () => {
        setShowInviteModal(false);
        setInviteMessage('Join our awesome collab team!');
        setInviteeId(null);
    };

    const sendInviteMessage = () => {
        if (!teamId || !inviteeId) {
            alert('Required information is missing!');
            return;
        }

        const inviteData = {
            receiverId: inviteeId,
            teamId,
            collabId: teamDetail?.collabId || '',
            message: inviteMessage,
        };

        dispatch(sendInvite(inviteData));
        setSentRequests((prev) => [
            ...prev,
            { receiverId: inviteeId, status: 'Pending', name: users.find((user) => user._id === inviteeId)?.name },
        ]);
        closeInviteModal();
    };

    const combinedRequests = [...teamInvites, ...sentRequests];

    useEffect(() => {
        if (inviteResponse) {
            setSentRequests((prev) =>
                prev.map((request) =>
                    request.receiverId === inviteeId ? { ...request, status: 'Sent Successfully' } : request
                )
            );
        }
    }, [inviteResponse]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                {isTeamLoading ? (
                    <p>Loading team details...</p>
                ) : isTeamError ? (
                    <p className="text-red-500">Error: {teamMessage}</p>
                ) : (
                    teamDetail && (
                        <div>
                            <h1 className="text-2xl font-bold mb-4">{teamDetail.teamName}</h1>
                            <h2 className="text-xl font-bold mt-6">Team Members:</h2>
                            <ul className="list-disc list-inside">
                                {teamDetail.members?.length > 0 ? (
                                    teamDetail.members.map((member) => (
                                        <li key={member._id}>
                                            {member.name} ({member.role})
                                        </li>
                                    ))
                                ) : (
                                    <p>No members found.</p>
                                )}
                            </ul>
                        </div>
                    )
                )}

                <div className="mt-6">
                    <label htmlFor="skill-select" className="block font-bold mb-2">
                        Filter users by skill:
                    </label>
                    <select
                        id="skill-select"
                        value={selectedSkill}
                        onChange={handleSkillChange}
                        className="border rounded-md p-2 w-full"
                    >
                        <option value="">-- Select a Skill --</option>
                        {skills.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill.replace('_', ' ').toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>

                <h2 className="text-xl font-bold mt-6">Users with Skill: {selectedSkill}</h2>
                {isUsersLoading ? (
                    <p>Loading users...</p>
                ) : isUsersError ? (
                    <p className="text-red-500">Error: {usersMessage}</p>
                ) : users?.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {users.map((user) => (
                           <div key={user._id} className="mb-4">
                           <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                               <div className="flex items-start justify-between">
                                   {/* User Info Section */}
                                   <div className="flex items-start space-x-4">
                                       {/* profile img  */}
                                       <div className="flex-shrink-0">
                                           <img
                                               src={user.profileImg}
                                               alt={user.name}
                                               className="w-16 h-16 rounded-full border-2 border-blue-500"
                                           />
                                       </div>
                   
                                       {/* User Details */}
                                       <div className="flex-grow">
                                           <h3 className="text-xl font-semibold text-gray-800">
                                               {user.name}
                                           </h3>
                                           
                                           {/* Title/Role */}
                                           <p className="text-gray-600 mb-2">
                                               {user.title || 'Developer'}
                                           </p>
                   
                                           {/* Skills */}
                                           <div className="mb-3">
                                               <p className="text-sm font-medium text-gray-700 mb-1">Skills:</p>
                                               <div className="flex flex-wrap gap-2">
                                                   {user.skills.map((skill, index) => (
                                                       <span
                                                           key={index}
                                                           className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                                                       >
                                                           {skill}
                                                       </span>
                                                   ))}
                                               </div>
                                           </div>
                   
                                          
                                       </div>
                                   </div>
                   
                                   {/* Action Buttons */}
                                   <div className="flex flex-col space-y-2">
                                       <button
                                           onClick={() => openInviteModal(user._id)}
                                           disabled={sentInvites.has(user._id)}
                                            className={`px-4 py-2 rounded-md transition-all duration-200 
                                                ${sentInvites.has(user._id) 
                                                    ? 'bg-green-500 text-white cursor-not-allowed'
                                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                                }`}
                                           >
                                          
                                           {sentInvites.has(user._id) ? 'Invited' : 'Invite'}
                                       </button>

                                       <div className="flex justify-center space-x-2">
                                                {user.linkedin && (
                                                    <a
                                                        href={user.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 hover:text-blue-600"
                                                    >
                                                        <svg 
                                                            className="w-5 h-5" 
                                                            fill="currentColor" 
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                                        </svg>
                                                    </a>
                                                )}
                                                {user.github && (
                                                    <a
                                                        href={user.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 hover:text-gray-900"
                                                    >
                                                        <svg 
                                                            className="w-5 h-5" 
                                                            fill="currentColor" 
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                       </div>
                                </div>
                            </div>
                        </div>
                                
                        ))}
                    </ul>
                ) : (
                    <p>No users found with the selected skill.</p>
                )}

                    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Sent Requests
                        </h2>

                        {combinedRequests.length > 0 ? (
                            <div className="grid gap-4">
                                {combinedRequests.map((request, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center justify-between p-4 rounded-lg border
                                                border-gray-100 hover:shadow-md transition-shadow duration-200"
                                    >
                                        {/* User Info */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                {request.avatar ? (
                                                    <img 
                                                        src={request.avatar} 
                                                        alt={request.name} 
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                ) : (
                                                    <span className="text-xl text-gray-500">
                                                        {(request.name || request.receiver.name || '?')[0].toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-800">
                                                    {request.name || request.receiver.name || 'Unknown User'}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Sent on: {new Date(request.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className={`
                                            px-3 py-1 rounded-full text-sm font-medium
                                            ${request.status === 'accepted' 
                                                ? 'bg-green-100 text-green-800' 
                                                : request.status === 'rejected'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'}
                                        `}>
                                            {request.status === 'accepted' && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" 
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                                            clipRule="evenodd" />
                                                    </svg>
                                                    Accepted
                                                </span>
                                            )}
                                            {request.status === 'rejected' && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" 
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                                            clipRule="evenodd" />
                                                    </svg>
                                                    Rejected
                                                </span>
                                            )}
                                            {(!request.status || request.status === 'pending') && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" 
                                                                stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" 
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Pending
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <svg 
                                    className="mx-auto h-12 w-12 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No requests sent</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Start by inviting team members to collaborate.
                                </p>
                            </div>
                        )}
                    </div>




                {showInviteModal && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-md w-96">
                            <h2 className="text-xl font-bold mb-4">Send Invite</h2>
                            <textarea
                                value={inviteMessage}
                                onChange={(e) => setInviteMessage(e.target.value)}
                                rows="4"
                                className="w-full border rounded-md p-2"
                                placeholder="Write your invite message here..."
                            ></textarea>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={closeInviteModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={sendInviteMessage}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamDetail;
