import React, { Component } from "react";
import ArticleCard from "./DisplayCard";
import ErrorAlert from "./ErrorAlert";
import ArticlesNav from "./ArticlesNav";
import PaginationNav from "./PaginationNav";
import * as api from "../api/api";

export default class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    orderBool: false,
    voteBool: false,
    err: "",
    page: 1,
    maxPage: 0,
    limit: 10,
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles() {
    const { topic } = this.props;
    const { sort_by, orderBool, page, limit } = this.state;
    let order = null;
    orderBool ? (order = "desc") : (order = "asc");
    api
      .getAllArticles(topic, limit, sort_by, page, order)
      .then(({ data }) => {
        let pageLimit = Math.ceil(data.total_count / 10);
        this.setState({
          articles: data.articles,
          maxPage: pageLimit,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.message, isLoading: false });
      });
  } // error handled

  componentDidUpdate(prevProps, prevState) {
    const topicChange = prevProps.topic !== this.props.topic;
    const sort_byChange = prevState.sort_by !== this.state.sort_by;
    if (prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
      this.fetchArticles(this.props.topic);
    }
    if (topicChange || sort_byChange) {
      this.setState({ isLoading: true, page: 1 });
      this.fetchArticles(this.props.topic);
    }
  }

  setOrderBy = () => {
    this.setState(
      (currentState) => {
        return {
          orderBool: !currentState.orderBool,
        };
      },
      () => {
        this.fetchArticles();
      }
    );
  };

  setSortBy = (e) => {
    this.setState({ sort_by: e.target.name }, () => {
      this.fetchArticles();
    });
  };

  setPage = (pageValue) => {
    this.setState((currentValue) => {
      return {
        page: currentValue.page + pageValue,
      };
    });
  };

  render() {
    if (this.state.isLoading) return <h3>Loading...</h3>;
    if (this.state.err) return <ErrorAlert err={this.state.err} />;
    return (
      <main className="articlesContainer">
        <h2 className="articleHeader">Articles...</h2>
        <h5 className="sortHeader" >sort by...</h5>
        <ArticlesNav
          orderBool={this.state.orderBool}
          setOrderBy={this.setOrderBy}
          setSortBy={this.setSortBy}
        />
        <PaginationNav
          setPage={this.setPage}
          page={this.state.page}
          maxPage={this.state.maxPage}
        />
        <ul className="ulArticleList">
          {this.state.articles.map((article) => {
            return <ArticleCard key={article.article_id} {...article} />;
          })}
        </ul>
      </main>
    );
  }
}
