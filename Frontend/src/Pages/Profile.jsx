import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from '../features/Post/postSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { userPosts, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchUserPosts());
    }, [dispatch]);

    return (
        <div className="bg-gradient-to-r from-[#CDF1FF] to-[#ECE9FF] p-5 rounded-lg">
            <h2 className="text-center font-bold text-xl">Your Profile</h2>
            
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md p-5 mt-5 flex flex-wrap">
                {/* Left Panel */}
                <div className="flex-1 text-center border-r border-gray-200 p-5 flex flex-col items-center justify-center">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Student"
                        className="w-[150px] h-[150px] rounded-full object-cover mb-3"
                    />
                    <h3 className="text-lg font-bold">Ishmam Ahasan Samin</h3>
                    <p className="text-gray-600">Web Developer</p>
                </div>

                {/* Right Panel */}
                <div className="flex-[2] p-5">
                    {/* General Information */}
                    <div className="mb-5">
                        <h3 className="text-lg font-bold mb-3">General Information</h3>
                        <table className="w-full">
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="py-2">Phone</td>
                                    <td className="py-2">: 125</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-2">Email</td>
                                    <td className="py-2">: 2020</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-2">Skills</td>
                                    <td className="py-2">: Male</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Other Information */}
                    <div>
                        <h3 className="text-lg font-bold mb-3">Other Information</h3>
                        <p className="text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </div>

            {/* Posts Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-5">Your Posts</h2>
                
                {loading && (
                    <div className="text-center py-4">
                        <p className="text-gray-600">Loading posts...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-4">
                        <p className="text-red-500">{error}</p>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {userPosts.map((post) => (
                        <div 
                            key={post._id} 
                            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden"
                        >
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-[200px] object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    {post.content.substring(0, 100)}...
                                </p>
                                <span className="text-xs text-gray-500">
                                    Posted on: {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show when no posts are available */}
                {!loading && !error && userPosts.length === 0 && (
                    <div className="text-center py-4">
                        <p className="text-gray-600">No posts found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;