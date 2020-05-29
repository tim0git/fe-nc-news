import axios from "axios";

const URL = "https://be-nc-reddit-app.herokuapp.com";

export const getArticleById = (article_id) => {
  return axios.get(`${URL}/api/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getAllArticles = (topic, limit, sort_by, page, order) => {
  return axios.get("https://be-nc-reddit-app.herokuapp.com/api/articles", {
    params: {
      topic: topic,
      sort_by: sort_by,
      order: order,
      p: page,
      limit: limit,
    },
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

export const removeComment = (comment_id) => {
  return axios.delete(`${URL}/api/comments/${comment_id}`).then((data) => {
    return data;
  });
};

export const patchVote = (id, voteInc, location) => {
  return axios
    .patch(`${URL}/api/${location}/${id}`, { inc_votes: voteInc })
    .then(({ data }) => {
      return data;
    });
};

export const getUserByUsername = (username) => {
  return axios
    .get(`https://be-nc-reddit-app.herokuapp.com/api/users/${username}`)
    .then(({ data }) => {
      return data.user;
    });
};
