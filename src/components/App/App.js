import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import MovieList from "../MovieList/MovieList";
import Search from "../Search/Search";
import { getMoviesForList } from "../../movie-helpers";
import MovieNightContext from "../../MovieNightContext";
import TokenService from "../../services/token-service";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Config from "../../config";
const API = Config.API_ENDPOINT;
toast.configure();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListSelected: {},
      lists: [],
      movies: [],
      setCurrentListSelected: this.setCurrentListSelected,
      votes: this.votes,
      addMovie: this.handleAddMovie,
      addList: this.handleAddList,
      deleteList: this.handleDeleteList,
      setLists: this.setLists,
      setMovies: this.setMovies,
      userId: this.userId,
      error: null,
      allLists: [],
    };
  }

  componentDidMount() {
    const token = TokenService.hasAuthToken();
    if (token) {
      this.fetchData(localStorage.getItem("userId"));
    } else {
      //if no userId, then fetch all lists and movies from DB in order to make list public for friends
      fetch(`${API}/lists`)
        .then((listsRes) => listsRes.json())
        .then((lists) => {
          this.setState({
            lists,
          });
          fetch(`${API}/movies`)
            .then((res) => res.json())
            .then((movies) => {
              this.setMovies(movies, this.state.lists);
            })
            .catch((res) => {
              this.setState({ error: res.error });
            });
        });
    }
  }

  static contextType = MovieNightContext;

  fetchData = (userId) => {
    this.setState({
      userId,
    });
    fetch(`${API}/lists`)
      .then((listsRes) => listsRes.json())
      .then((lists) => {
        this.setState({
          lists: lists.filter(
            (list) => list.user_id.toString() === userId.toString()
          ),
        });
        fetch(`${API}/movies`)
          .then((res) => res.json())
          .then((movies) => {
            this.setMovies(movies, this.state.lists);
          })
          .catch((res) => {
            this.setState({ error: res.error });
          });
      });
  };

  setMovies = (movieArr) => {
    this.setState({
      movies: movieArr,
    });
  };

  setCurrentListSelected = (obj) => {
    this.setState({ currentListSelected: obj });
  };

  handleAddList = (list) => {
    const newList = [...this.state.lists, list];
    this.setState({ lists: newList });
  };

  handleAddMovie = (movie) => {
    const newMovies = [...this.state.movies, movie];
    this.setState({
      movies: newMovies,
    });
  };

  handleDeleteList = (listId) => {
    this.setState({
      lists: this.state.lists.filter((list) => list.id !== listId),
    });
  };

  addVoteClick = (movieId) => {
    const movieVoted = this.state.movies.find((movie) => movie.id === movieId);
    if (movieVoted.id !== movieId)
      throw new Error("this is not the correct movie object");
    const movieUpdated = Object.assign({}, movieVoted, {
      votes: movieVoted.votes + 1,
    });
    this.setState({
      movies: this.state.movies.map((movie) =>
        movie.id === movieId ? movieUpdated : movie
      ),
    });
    fetch(`${API}/movies`, {
      method: "PUT",
      body: JSON.stringify(movieUpdated),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            console.log(`Error is: ${err}`);
            throw err;
          });
        }
        return res.json();
      })
      .then((data) => {
        this.context.addMovie(data);
      })
      .catch((err) => {
        this.setState({ err });
      });
  };

  render() {
    return (
      <div className="App">
        <MovieNightContext.Provider value={this.state}>
          <main className="App_Main">
            <Switch>
              <Route
                exact
                path={"/"}
                render={(props) => {
                  return <LoginForm {...props} setUserId={this.fetchData} />;
                }}
              />
              <Route
                path={"/search"}
                render={() => {
                  return (
                    <Search
                      lists={this.state.lists}
                      handleAddList={this.handleAddList}
                      handleAddMovie={this.handleAddMovie}
                    />
                  );
                }}
              />
              <Route path="/registration" component={RegistrationForm} />
              <Route
                path="/list/:listId"
                render={(routeProps) => {
                  return (
                    <MovieList
                      lists={this.state.lists}
                      handleAddList={this.handleAddList}
                      movies={getMoviesForList(
                        this.state.movies,
                        Number(routeProps.match.params.listId)
                      )}
                      addVoteClick={this.addVoteClick}
                    />
                  );
                }}
              />
            </Switch>
          </main>
        </MovieNightContext.Provider>
      </div>
    );
  }
}

export default App;
