import React, { useState } from 'react';

const CreateProposal = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    requirements: [],
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  // Sample requirements options
  const requirementOptions = [
    'React.js',
    'Node.js',
    'Python',
    'UI/UX Design',
    'Mobile Development',
    'Database Management',
    'DevOps',
    'Machine Learning'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequirementChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      requirements: value
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Proposal</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your project and requirements"
              required
            />
          </div>

          {/* Requirements Dropdown */}
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
              Requirements (Hold Ctrl/Cmd to select multiple)
            </label>
            <select
              id="requirements"
              name="requirements"
              multiple
              value={formData.requirements}
              onChange={handleRequirementChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              size="5"
            >
              {requirementOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {formData.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProposal;
