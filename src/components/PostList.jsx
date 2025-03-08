import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAsync, setEditPost, setSearchQuery } from '../features/posts/postsSlice';
import PostItem from './PostItem';

const PostList = () => {
  const dispatch = useDispatch();

  // Get state from Redux store
  const { posts, loading, error, searchQuery } = useSelector((state) => state.posts);

  // Fetch posts on component mount
  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value)); // Dispatch the Redux action
  };

  // Display loading or error messages
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Display Filtered Posts */}
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onEdit={() => dispatch(setEditPost(post))}
          />
        ))
      ) : (
        <p className="text-center text-gray-600">No posts found.</p>
      )}
    </div>
  );
};

export default PostList;