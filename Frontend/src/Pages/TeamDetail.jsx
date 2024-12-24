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
                            <li key={user._id} className="flex justify-between items-center">
                                <span>{user.name} ({user.skills.join(', ')})</span>
                                <button
                                    onClick={() => openInviteModal(user._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Invite
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users found with the selected skill.</p>
                )}

                <h2 className="text-xl font-bold mt-6">Sent Requests:</h2>
                {combinedRequests.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {combinedRequests.map((request, index) => (
                            <li key={index}>
                                {request.name || `User ID: ${request.receiver.name}`} - {request.status || 'Pending'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No requests sent yet.</p>
                )}

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
