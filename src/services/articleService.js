import api from "./api";

const articleService = {
  getAllArticles: () => api.get("/articles"),

  getArticleById: (id) => api.get(`/articles/${id}`),

  createArticle: (articleData) => api.post("/articles", articleData),

  updateArticle: (id, articleData) => api.put(`/articles/${id}`, articleData),

  deleteArticle: (id) => api.delete(`/articles/${id}`),
};

export default articleService;
