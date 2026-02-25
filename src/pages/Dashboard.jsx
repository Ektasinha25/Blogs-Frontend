import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ArticleList from '../components/Articles/ArticleList';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h1>Welcome</h1>
      <Link to="/create" className="create-btn">
        Create New Article
      </Link>
      <ArticleList userIdFilter={user?.id} />
    </div>
  );
};

export default Dashboard;