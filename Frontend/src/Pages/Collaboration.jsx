import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { createCollab, createTeam, getTeamsByCollab, getMyCollabs } from '../features/Collab/collabSlice.js';

const skillsOptions = [
    { value: 'React.js', label: 'React.js' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'TailwindCSS', label: 'TailwindCSS' },
    { value: 'UI/UX Design', label: 'UI/UX Design' },
    { value: 'Python', label: 'Python' },
];

const tagsOptions = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'teamwork', label: 'Teamwork' },
];

const Collaboration = () => {
    const dispatch = useDispatch();
    const { collabs, teams, isLoading, isError, message } = useSelector((state) => state.collab);

    const [collabData, setCollabData] = useState({
        name: '',
        description: '',
        requirements: [],
        tags: [],
    });

    const [selectedCollabId, setSelectedCollabId] = useState('');
    const [teamData, setTeamData] = useState({
        collabId: '',
        teamName: '',
        members: '',
    });

    useEffect(() => {
        dispatch(getMyCollabs())
    });

    const handleCreateCollab = async () => {
        try {
            const formattedData = {
                ...collabData,
                requirements: collabData.requirements.map((item) => item.value),
                tags: collabData.tags.map((item) => item.value),
            };
            const result = await dispatch(createCollab(formattedData)).unwrap();
            setSelectedCollabId(result._id);
        } catch (error) {
            console.error('Error creating collab:', error);
        }
    };

    const handleCreateTeam = async () => {
        try {
            await dispatch(createTeam({ ...teamData, collabId: selectedCollabId })).unwrap();
            await dispatch(getTeamsByCollab(selectedCollabId)); // Refresh teams
            setTeamData({ collabId: '', teamName: '', members: '' });
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };

    const fetchTeams = async (collabId) => {
        try {
            setSelectedCollabId(collabId);
            await dispatch(getTeamsByCollab(collabId));
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-6">
                <div className="space-y-6">
                    {/* Create Collaboration */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4">Start Collaboration</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleCreateCollab();
                            }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                placeholder="Collab Name"
                                value={collabData.name}
                                onChange={(e) => setCollabData({ ...collabData, name: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={collabData.description}
                                onChange={(e) => setCollabData({ ...collabData, description: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <Select
                                options={skillsOptions}
                                isMulti
                                placeholder="Select Requirements"
                                value={collabData.requirements}
                                onChange={(selected) => setCollabData({ ...collabData, requirements: selected })}
                                className="w-full"
                            />
                            <Select
                                options={tagsOptions}
                                isMulti
                                placeholder="Select Tags"
                                value={collabData.tags}
                                onChange={(selected) => setCollabData({ ...collabData, tags: selected })}
                                className="w-full"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
                            >
                                Create Collaboration
                            </button>
                        </form>
                    </div>

                    {/* Select Collaboration and Show Teams */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4">Select Collaboration</h3>
                        <select
                            onChange={(e) => fetchTeams(e.target.value)}
                            value={selectedCollabId}
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="" disabled>
                                Select Collaboration
                            </option>
                            {collabs.map((collab) => (
                                <option key={collab._id} value={collab._id}>
                                    {collab.name}
                                </option>
                            ))}
                        </select>

                        {teams.length > 0 ? (
                            <ul className="space-y-4">
                                {teams.map((team) => (
                                    <li key={team._id} className="border rounded-lg p-4 hover:shadow-md">
                                        <div className="font-bold">{team.teamName}</div>
                                        <ul className="text-gray-500 mt-2">
                                            {team.members?.length > 0 ? (
                                                team.members.map((member) => (
                                                    <li key={member._id} className="text-sm">
                                                        {member.name}
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No members</li>
                                            )}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No Teams for this Collaboration</p>
                        )}

                        {/* Create Team */}
                        {selectedCollabId && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleCreateTeam();
                                }}
                                className="space-y-4 mt-6"
                            >
                                <input
                                    type="text"
                                    placeholder="Team Name"
                                    value={teamData.teamName}
                                    onChange={(e) => setTeamData({ ...teamData, teamName: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Add Team Members (comma-separated emails)"
                                    value={teamData.members}
                                    onChange={(e) => setTeamData({ ...teamData, members: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md"
                                >
                                    Create Team
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collaboration;
