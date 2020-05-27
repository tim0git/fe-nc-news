import axios from "axios";

const URL = "https://be-nc-reddit-app.herokuapp.com";

export const getArticleById = (article_id) => {
  return axios.get(`${URL}/api/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return axios
    .get(`${URL}/api/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const postCommentById = (messageBody, article_id) => {
  return axios
    .post(`${URL}/api/articles/${article_id}/comments`, messageBody)
    .then((res) => {
      return res.data;
    });
};

// Route for comment
// /api/articles/:article_id/comments
//POST
// body of comment..
// { username: "lurker", body: "lorem10" }
//   console.log(messageBody);
//   console.log(article_id);
