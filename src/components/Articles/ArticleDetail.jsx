/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import articleService from '../../services/articleService';
import { AuthContext } from '../../context/AuthContext';

const ArticleDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await articleService.getArticleById(id);
      setArticle(response.data.data);
    } catch (err) {
      setError('Article not found');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        await articleService.deleteArticle(id);
        navigate('/dashboard');
      } catch (err) {
        setError('Failed to delete article');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!article) return <p>Article not found</p>;

  const isAuthor = user?.id === article.author_id;

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <p className="meta">By {article.username} | {article.category}</p>
      <p className="date">{new Date(article.created_at).toLocaleDateString()}</p>
      <div className="content">{article.content}</div>
      {isAuthor && (
        <div className="actions">
          <button onClick={() => navigate(`/articles/${id}/edit`)}>Edit</button>
          <button onClick={handleDelete} className="delete-btn">Delete</button>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;