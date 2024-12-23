import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPostsBySkills,
    likePostAsync,
    addCommentAsync,
    createPostAsync,
} from "../features/Post/postSlice.js";
import moment from "moment";

function Home() {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.posts);
    const [newPostContent, setNewPostContent] = useState("");
    const [newPostTitle, setNewPostTitle] = useState("");
    const [commentPanels, setCommentPanels] = useState({});
    const [newComments, setNewComments] = useState({});

    useEffect(() => {
        dispatch(fetchPostsBySkills());
    }, [dispatch]);

    const handleAddPost = () => {
        if (newPostContent.trim() && newPostTitle.trim()) {
            dispatch(createPostAsync({ title: newPostTitle, content: newPostContent }));
            setNewPostContent("");
            setNewPostTitle("");
        }
    };

    const handleLikePost = (postId) => {
        dispatch(likePostAsync(postId));
    };

    const toggleCommentsPanel = (postId) => {
        setCommentPanels((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    const handleAddComment = (postId) => {
        const commentText = newComments[postId]?.trim();
        if (commentText) {
            console.log("Adding comment:", { postId, comment: commentText });
            dispatch(addCommentAsync({ postId, comment: commentText }));
            setNewComments((prev) => ({ ...prev, [postId]: "" }));
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            {/* Add New Post Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <input
                        type="text"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="Post Title"
                        className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="What's on your mind?"
                        className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                    <button
                        onClick={handleAddPost}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Posts Feed */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                posts.map((post) => (
                    <div
                        key={post._id}
                        className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col"
                    >
                        <div className="flex items-center mb-4">
                            <img
                                src={post.user.profileImg}
                                alt={post.user.name}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <p className="font-semibold">{post.user.name}</p>
                                <p className="text-gray-500 text-sm">
                                    {moment(post.createdAt).fromNow()}
                                </p>
                            </div>
                        </div>
                        <p className="font-bold text-lg mb-2">{post.title}</p>
                        <p className="text-gray-700 mb-2">{post.content}</p>
                        {post.imageUrl && (
                            <img
                                src={post.imageUrl}
                                alt="Post Image"
                                className="rounded-lg mb-2"
                            />
                        )}
                        <p className="text-sm text-gray-500 mb-2">
                            Skills: {post.skills.join(", ")}
                        </p>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                            <button
                                className="flex items-center text-gray-500 hover:text-blue-500"
                                onClick={() => handleLikePost(post._id)}
                            >
                                <span className="mr-2">👍</span> Like ({post.likes.length})
                            </button>
                            <button
                                className="flex items-center text-gray-500 hover:text-blue-500"
                                onClick={() => toggleCommentsPanel(post._id)}
                            >
                                <span className="mr-2">💬</span> Comment ({post.comments.length})
                            </button>
                            <button className="flex items-center text-gray-500 hover:text-blue-500">
                                <span className="mr-2">📤</span> Share
                            </button>
                        </div>

                        {/* Comments Panel */}
                        {commentPanels[post._id] && (
                            <div className="mt-4">
                                <div className="space-y-2">
                                    {post.comments.map((comment) => (
                                        <div
                                            key={comment._id}
                                            className="text-gray-700 bg-gray-100 p-2 rounded-lg"
                                        >
                                            <p>
                                                <strong>User:</strong> {comment.user}
                                            </p>
                                            <p>{comment.text}</p>
                                            <p className="text-sm text-gray-500">
                                                {moment(comment.createdAt).fromNow()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <textarea
                                        value={newComments[post._id] || ""}
                                        onChange={(e) =>
                                            setNewComments((prev) => ({
                                                ...prev,
                                                [post._id]: e.target.value,
                                            }))
                                        }
                                        placeholder="Write a comment..."
                                        className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    ></textarea>
                                    <button
                                        onClick={() => handleAddComment(post._id)}
                                        className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
