const Post = require("../models/postModels");
const deleteFromCloud = require('../configs/Cloud Config/deleteFromCloud');
const uploadOnCloudinary = require('../configs/Cloud Config/uploadOnCloud');
const mongoose = require("mongoose");


// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, content, skills } = req.body;
        const skillArray = skills.split(",").map((skill) => skill.trim());
        if (!req.files || !req.files.image) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const file = req.files.image; // Assuming image file is sent in the request

        // Upload image to Cloudinary
        const uploadResult = await uploadOnCloudinary(file, "posts");

        const newPost = new Post({
            title,
            content,
            skills:skillArray,
            user: req.user._id,
            imageUrl: uploadResult.secure_url,
            imagePublicId: uploadResult.public_id,
        });

        const savedPost = await newPost.save();

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: savedPost,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create post",
            error: error.message,
        });
    }
};

//Get a post by user skills
exports.getPosts = async (req, res) => {
    try {
        const userSkills = req.user.skills;
        // console.log(userSkills)


        // Fetch posts that match any of the user's skills
        const posts = await Post.find()
            .populate("user", "name profileImg") // Populate user details (name and profile image)
            .sort({ createdAt: -1 }); // Sort by newest posts first

        res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch posts",
            error: error.message,
        });
    }
};
// User gets his own posts
exports.getUserPosts = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch posts created by the user
        const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });

        // If no posts are found, return an empty array instead of a 404 error
        res.status(200).json({
            success: true,
            message: posts.length === 0 ? "No posts found for this user" : "User's posts retrieved successfully",
            data: posts, // This will be an empty array if no posts are found
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve posts",
            error: error.message,
        });
    }
};


// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Check if the authenticated user is the post's owner
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete this post",
            });
        }

        // Delete the image from Cloudinary
        if (post.imagePublicId) {
            await deleteFromCloud(post.imagePublicId);
        }

        // Delete the post from the database
        await Post.findByIdAndDelete(postId);

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete post",
            error: error.message,
        });
    }
};

// Like/Unlike a post
exports.likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Check if user has already liked the post
        if (post.likes.includes(userId)) {
            // Remove the user ID from the likes array (unlike the post)
            post.likes = post.likes.filter((id) => id.toString() !== userId);
            await post.save();
            return res.status(200).json({ success: true, message: "Post unliked successfully" });
        }

        // Add the user ID to the likes array (like the post)
        post.likes.push(userId);
        await post.save();
        res.status(200).json({ success: true, message: "Post liked successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to like/unlike post", error: error.message });
    }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;

        // Validate `text` field
        if (!text || typeof text !== "string") {
            return res.status(400).json({ success: false, message: "Comment text is required" });
        }

        // Validate `postId`
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ success: false, message: "Invalid post ID" });
        }

        // Get `userId` from `req.user`
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Add comment to the post
        const comment = {
            user: userId,
            text,
            createdAt: new Date(),
        };
        post.comments.push(comment);

        // Save the updated post
        await post.save();

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: comment,
        });
    } catch (error) {
        console.error("Error adding comment:", error.message);
        res.status(500).json({ success: false, message: "Failed to add comment", error: error.message });
    }
};

