import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import axios from "axios";


export default class ArticlesList extends Component {
  state = {
    articles: [
      {
        article_id: 33,
        title: "Seafood substitutions are increasing",
        body:
          "'SEAFOOD fraud is a serious global problem', begins a recent report from Oceana, an NGO. Reviewing over 200 studies in 55 countries, the report finds that one in five fish sold has been mislabelled. Although fish fraud is common early in the supply chain, most of it comes at the retail level. In 65% of cases, the motivation is economic—slippery restaurateurs frequently serve up cheaper fish than they advertise to cut costs. In America, Oceana has reported instances of tilapia being sold as the more expensive red snapper. Especially brazen fish criminals have invented new types of fish entirely. In Brazil, researchers were puzzled to find markets selling 'douradinha', ' non-existent species. Close inspection found that 60% of such fish were actually 'vulture' catfish, a relatively undesirable dish. Reports in America of catfish being substituted for more expensive fish date back to at least 2002; Oceana’s study suggests that the phenomenon is spreading.",
        votes: 0,
        topic: "cooking",
        author: "weegembump",
        created_at: "2018-05-30T15:59:13.341Z",
        comment_count: "6",
      },
      {
        article_id: 28,
        title: "High Altitude Cooking",
        body:
          "Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.",
        votes: 0,
        topic: "cooking",
        author: "happyamy2016",
        created_at: "2018-05-27T03:32:28.514Z",
        comment_count: "5",
      },
      {
        article_id: 30,
        title:
          "Twice-Baked Butternut Squash Is the Thanksgiving Side Dish of Your Dreams",
        body:
          "What if, for once, your Thanksgiving sides were just as dazzling as the centerpiece turkey? Imagine a world where presenting a platter of seasonal vegetables inspires the same amount of cooing that the turkey does. Welcome to the world of twice-baked butternut squash. Sure, you could just roast some squash wedges and call it a day. But where's the fun in that? To make this year's most impressive vegetable side, Epi's food director Rhoda Boone gave super-seasonal butternut squash the twice-baked potatoes treatment: Mash the inside of the vegetable with butter, cream, and anything else that might make it more delicious, then pile it back into the vegetable, bake it until golden and velvety. The result is a jaw-dropping, brightly colored sweet-meet-savory butternut squash side dish. Here are just a few more reasons this creation belongs on this year's Thanksgiving table:",
        votes: 0,
        topic: "cooking",
        author: "jessjelly",
        created_at: "2018-05-06T02:40:35.489Z",
        comment_count: "8",
      },
    ],
    totalCount: 300,
    topic: "",
    isLoading: true,
    sort_by: "created_at",
    orderBool: false,
    voteBool: false,
    currentVote: 0,
  };

  componentDidMount() {
    this.fetchArticles();
  }

  updateVote = (e, id) => {
    console.log(id);
    let voteInc = 0;
    this.state.voteBool ? (voteInc = -1) : (voteInc = 1);

    this.setState((currentState) => {
      return {
        voteBool: !currentState.voteBool,
        currentVote: currentState.currentVote + voteInc,
      };
    });
    console.log(voteInc, this.state.voteBool);

    // api.patchVote(id, voteInc).then((res) => {
    //   console.dir(res);
    // });
    console.log("article updateVote");
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
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

  render() {
    if (this.state.isLoading) return <h3>Loading...</h3>;
    return (
      <main className="articlesContainer">
        <h2 className="articleHeader">Articles...</h2>
        <label className="commentsIcon">
          <button
            style={{ color: "none", textDecoration: "none" }}
            className="far fa-comments fa-2x commentsIcon"
            name="comment_count"
            onClick={(e) => this.setSortBy(e)}
          ></button>
          <p>Comments</p>
        </label>
        <label className="votesIcon">
          <button
            className="far fa-star fa-2x votesIcon"
            name="votes"
            onClick={(e) => this.setSortBy(e)}
          ></button>
          <p>Votes</p>
        </label>
        <label className="dateIcon">
          <button
            className="far fa-calendar-alt fa-2x dateIcon"
            name="created_at"
            onClick={(e) => this.setSortBy(e)}
          ></button>
          <p>Date</p>
        </label>
        <label className="orderIcon">{this.state.orderBool ? this.orderDesc : this.orderAsc}</label>
        <ul className="ulArticleList">
          {this.state.articles.map((article) => {
            return (
              <ArticleCard
                key={article.article_id}
                {...article}
                updateVote={this.updateVote}
                currentVote={this.state.currentVote}
              />
            );
          })}
        </ul>
      </main>
    );
  }

  fetchArticles() {
    const { topic } = this.props;
    const { sort_by, orderBool } = this.state;

    let order = null;
    orderBool ? (order = "desc") : (order = "asc");

    axios
      .get("https://be-nc-reddit-app.herokuapp.com/api/articles", {
        params: { topic: topic, sort_by: sort_by, order: order },
      })
      .then(({ data }) => {
        this.setState({
          articles: data.articles,
          isLoading: false,
        });
      });
  }
  orderDesc = (
    <>
      <button
        className="fas fa-sort-amount-down-alt fa-2x orderIcon"
        onClick={this.setOrderBy}
      ></button>
      <p>Desc</p>
    </>
  );

  orderAsc = (
    <>
      <button
        className="fas fa-sort-amount-up-alt fa-2x orderIcon"
        onClick={this.setOrderBy}
      ></button>
      <p>Asc</p>
    </>
  );
}
