import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import ErrorAlert from "./ErrorAlert";
import ArticlesNav from "./ArticlesNav";
import PaginationNav from "./PaginationNav";
import * as api from "../api/api";

export default class ArticlesList extends Component {
  state = {
    articles: [],
    topic: "",
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
    this.setTotalArticles();
  }

  setTotalArticles() {
    const { topic } = this.props;
    const limit = 40;
    api
      .getAllArticles(topic, limit)
      .then(({ data }) => {
        const pageLimit = Math.ceil(data.articles.length / 10);

        this.setState({
          maxPage: pageLimit,
        });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.message, isLoading: false });
      });
  }

  fetchArticles() {
    const { topic } = this.props;
    const { sort_by, orderBool, page, limit } = this.state;
    let order = null;
    orderBool ? (order = "desc") : (order = "asc");
    api
      .getAllArticles(topic, limit, sort_by, page, order)
      .then(({ data }) => {
        this.setState({
          articles: data.articles,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.message, isLoading: false });
      });
  } // error handled

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      this.setState({ isLoading: true });
      this.fetchArticles(this.props.topic);
    }
    if (prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
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
