
import React from 'react';
import ArticleList from '../components/Articles/ArticleList';

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to Blogs</h1>
        <p>Discover amazing articles from our community</p>
      </header>
      <ArticleList />
    </div>
  );
};

export default Home;