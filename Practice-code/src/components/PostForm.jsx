import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPostAsync, updatePostAsync, cancelEdit } from '../features/posts/postsSlice';

const PostForm = () => {
  const dispatch = useDispatch();
  const editPost = useSelector((state) => state.posts.editPost);
  const [formData, setFormData] = useState({ title: '', body: '' });

  useEffect(() => {
    if (editPost) {
      setFormData({ title: editPost.title, body: editPost.body });
    }
  }, [editPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.body.trim()) {
      if (editPost) {
        dispatch(updatePostAsync({ id: editPost.id, post: formData }));
      } else {
        dispatch(addPostAsync(formData));
      }
      setFormData({ title: '', body: '' });
    } else {
      alert('Title and body cannot be empty');
    }
  };

  const handleCancel = () => {
    dispatch(cancelEdit());
    setFormData({ title: '', body: '' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">{editPost ? 'Edit Post' : 'Add Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {editPost ? 'Update' : 'Add'} Post
          </button>
          {editPost && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostForm;