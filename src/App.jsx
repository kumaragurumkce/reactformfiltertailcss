import React from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">React Redux CRUD App</h1>
      <PostForm />
      <PostList />
    </div>
  );
};

export default App;