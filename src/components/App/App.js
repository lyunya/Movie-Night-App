import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import MovieList from "../MovieList/MovieList";
import Search from "../Search/Search";
import { getMoviesForList } from "../../movie-helpers";
import MovieNightContext from "../../MovieNightContext";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Config from "../../config";
const API = Config.API_ENDPOINT;
toast.configure();

class App extends React.Component {
  state = {
    lists: [],
    movies: [],
    currentListSelected: {},
  };

  // componentDidMount() {
  //   Promise.all([fetch(`${API}/movies`), fetch(`${API}/lists`)])
  //     .then(([moviesRes, listsRes]) => {
  //       if (!moviesRes.ok)
  //         return moviesRes.json().then((e) => Promise.reject(e));
  //       if (!listsRes.ok) return listsRes.json().then((e) => Promise.reject(e));
  //       return Promise.all([moviesRes.json(), listsRes.json()]);
  //     })
  //     .then(([movies, lists]) => {
  //       movies.map((movie) => {
  //         return this.handleAddMovie(movie);
  //       });
  //       lists.map((list) => {
  //         return this.handleAddList(list);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error({ error });
  //     });
  // }

  setLists = (listsArr, userId) => {
    const userLists = listsArr.filter((list) => list.userId === userId);
    this.setState({
      lists: userLists,
    });
  };

  setMovies = (movieArr, listArr) => {
    console.log(movieArr, listArr)
    // let movies = [];
    // for (let i=0; i < movieArr.length; i++) {
    //   if (movieArr[i].movielist_id === listArr[j].id) {
    //     movies.push(movieArr[i]);
    //   }
    // }

    this.setState({
      movies: movieArr,
    });
    // return result

    // const userMovies = listArr.map(list => {
    //   movieArr.filter(movie => movie.movielist_id === list.id)
    // })
    // // this.setState({

    // // })
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
    const contextValue = {
      lists: this.state.lists,
      movies: this.state.movies,
      currentListSelected: this.state.currentListSelected,
      setCurrentListSelected: this.setCurrentListSelected,
      votes: this.votes,
      addMovie: this.handleAddMovie,
      addList: this.handleAddList,
      deleteList: this.handleDeleteList,
      setLists: this.setLists,
      setMovies: this.setMovies,
    };
    return (
      <div className="App">
        <MovieNightContext.Provider value={contextValue}>
          <main className="App_Main">
            <Switch>
              <Route exact path={"/"} component={LoginForm} />
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
