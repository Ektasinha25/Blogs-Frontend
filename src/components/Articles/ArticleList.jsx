/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import articleService from '../../services/articleService';

const ArticleList = ({ userIdFilter = null }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, [userIdFilter]);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [articles, searchTerm, selectedCategory]);

  const fetchArticles = async () => {
    try {
      const response = await articleService.getAllArticles();
      let allArticles = response.data.data;
      
      // Filter by user ID if provided (for dashboard)
      if (userIdFilter) {
        allArticles = allArticles.filter(article => article.author_id === userIdFilter);
      }
      
      setArticles(allArticles);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(allArticles.map(article => article.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Search by title, content, and tags
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(lowerSearchTerm);
        const contentMatch = article.content.toLowerCase().includes(lowerSearchTerm);
        const summaryMatch = article.summary.toLowerCase().includes(lowerSearchTerm);
        const tagsMatch = article.tags && article.tags.toLowerCase().includes(lowerSearchTerm);
        
        return titleMatch || contentMatch || summaryMatch || tagsMatch;
      });
    }

    setFilteredArticles(filtered);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="articles-container">
      <h2>{userIdFilter ? 'My Articles' : 'All Articles'}</h2>
      
      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-box">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleResetFilters} className="reset-btn">
          Reset Filters
        </button>
      </div>

      {/* Results Counter */}
      <p className="results-count">
        Found {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
      </p>

      {/* Articles Grid */}
      <div className="articles-grid">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className="article-card">
              <h3>{article.title}</h3>
              <p className="author">By {article.username}</p>
              <p className="category">{article.category}</p>
              <p className="summary">{article.summary}</p>
              {article.tags && <p className="tags">{article.tags}</p>}
              <Link to={`/articles/${article.id}`} className="read-more">
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p className="no-results">No articles found. Try adjusting your filters.</p>
        )}
      </div>
    </div>
  );
};

export default ArticleList;