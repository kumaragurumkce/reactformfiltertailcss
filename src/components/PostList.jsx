import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAsync, setEditPost, deletePostAsync } from '../features/posts/postsSlice';
import PostItem from './PostItem';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={() => dispatch(setEditPost(post))}
          onDelete={() => dispatch(deletePostAsync(post.id))}
        />
      ))}
    </div>
  );
};

export default PostList;