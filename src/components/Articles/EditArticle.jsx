/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import articleService from '../../services/articleService';
import aiService from '../../services/aiService';

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
  });
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiError, setAiError] = useState('');
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await articleService.getArticleById(id);
      const article = response.data.data;
      setFormData({
        title: article.title,
        content: article.content,
        category: article.category,
        tags: article.tags || '',
      });
    } catch (err) {
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImproveContent = async () => {
    if (!formData.content) {
      setAiError('Please write some content first');
      return;
    }

    setAiLoading(true);
    setAiError('');
    try {
      const improved = await aiService.improveContent(formData.content);
      setFormData({ ...formData, content: improved });
      setAiError('✅ Content improved successfully!');
      setTimeout(() => setAiError(''), 3000);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleMakeConcise = async () => {
    if (!formData.content) {
      setAiError('Please write some content first');
      return;
    }

    setAiLoading(true);
    setAiError('');
    try {
      const concise = await aiService.makeConcise(formData.content);
      setFormData({ ...formData, content: concise });
      setAiError('✅ Content made more concise!');
      setTimeout(() => setAiError(''), 3000);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSuggestTitle = async () => {
    if (!formData.content) {
      setAiError('Please write some content first');
      return;
    }

    setAiLoading(true);
    setAiError('');
    try {
      const suggestedTitles = await aiService.suggestTitle(formData.content);
      setFormData({ ...formData, suggestedTitles });
      setShowTitleSuggestions(true);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleImproveGrammar = async () => {
    if (!formData.content) {
      setAiError('Please write some content first');
      return;
    }

    setAiLoading(true);
    setAiError('');
    try {
      const improved = await aiService.improveGrammar(formData.content);
      setFormData({ ...formData, content: improved });
      setAiError('✅ Grammar improved!');
      setTimeout(() => setAiError(''), 3000);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSelectTitle = (title) => {
    setFormData({ ...formData, title });
    setShowTitleSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await articleService.updateArticle(id, formData);
      navigate(`/articles/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update article');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-article-container">
      <h2>Edit Article</h2>
      {error && <p className="error">{error}</p>}
      {aiError && (
        <p className={`ai-message ${aiError.includes('✅') ? 'success' : 'error'}`}>
          {aiError}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-with-ai">
            <input
              type="text"
              name="title"
              placeholder="Article Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={handleSuggestTitle}
              disabled={aiLoading}
              className="ai-btn ai-suggest-title"
              title="Generate better title suggestions based on your content"
            >
              {aiLoading ? '⏳ Loading...' : '✨ Suggest Title'}
            </button>
          </div>

          {showTitleSuggestions && formData.suggestedTitles && (
            <div className="title-suggestions">
              <p className="suggestions-label">Suggested Titles:</p>
              <div className="suggestions-list">
                {formData.suggestedTitles.split('\n').map((title, index) => (
                  title.trim() && (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectTitle(title.trim())}
                      className="suggestion-item"
                    >
                      {title.trim()}
                    </button>
                  )
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowTitleSuggestions(false)}
                className="close-suggestions"
              >
                Close
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <div className="textarea-header">
            <label>Article Content</label>
            <div className="ai-buttons-group">
              <button
                type="button"
                onClick={handleImproveContent}
                disabled={aiLoading}
                className="ai-btn"
                title="Rewrite content more clearly"
              >
                {aiLoading ? '⏳' : '✨'} Improve
              </button>
              <button
                type="button"
                onClick={handleImproveGrammar}
                disabled={aiLoading}
                className="ai-btn"
                title="Improve grammar and writing"
              >
                {aiLoading ? '⏳' : '📝'} Grammar
              </button>
              <button
                type="button"
                onClick={handleMakeConcise}
                disabled={aiLoading}
                className="ai-btn"
                title="Make content more concise"
              >
                {aiLoading ? '⏳' : '📏'} Concise
              </button>
            </div>
          </div>
          <textarea
            name="content"
            placeholder="Article Content"
            rows="10"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags"
          value={formData.tags}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading || aiLoading}>
          {loading ? 'Updating...' : 'Update Article'}
        </button>
      </form>
    </div>
  );
};

export default EditArticle;