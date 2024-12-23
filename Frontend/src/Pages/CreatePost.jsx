import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostAsync } from '../features/Post/postSlice';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    skills: '',
    image: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert skills string to array
    // const skillsArray = formData.skills.split(',').map(skill => skill.trim());
    
    // Create FormData object for image upload
    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('content', formData.content);
    postData.append('skills', formData.skills);
    if (formData.image) {
      postData.append('image', formData.image);
    }
    console.log(postData);  
    try {
      await dispatch(createPostAsync(postData)).unwrap();
      toast.success('Post created successfully!');
      // Reset form
      setFormData({
        title: '',
        content: '',
        skills: '',
        image: null
      });
    } catch (error) {
      toast.error(error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Skills (comma-separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
