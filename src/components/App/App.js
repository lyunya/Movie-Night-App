import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import MovieList from "../MovieList/MovieList";
import MovieListNav from "../MovieListNav/MovieListNav";
import Search from "../Search/Search";
import dummyStore from "../../dummy-store";
import { getMoviesForList } from "../../movie-helpers";
import MovieNightContext from "../../MovieNightContext";
import "./App.css";
const { uuid } = require("uuidv4");

class App extends React.Component {
  state = {
    lists: [],
    movies: [],
    currentListSelected: {},
  };

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 500);
  }
  setCurrentListSelected = (obj) => {
    this.setState({ currentListSelected: obj });
  };
  handleAddList = (list) => {
    const newList = [
      ...this.state.lists,
      { name: list, id: uuid(), user_id: 0 },
    ];
    this.setState({ lists: newList });
  };

  renderMovieListRoutes() {
    const { lists, movies } = this.state;

    return (
      <>
        {["/", "/list/:listId"].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            render={(routeProps) => (
              <>
                <div className="movielist_nav">
                  {" "}
                  <MovieListNav
                    lists={lists}
                    movies={movies}
                    {...routeProps}
                    handleAddList={this.handleAddList}
                  />
                </div>
              </>
            )}
          />
        ))}
      </>
    );
  }

  render() {
    const contextValue = {
      lists: this.state.lists,
      movies: this.state.movies,
      currentListSelected: this.state.currentListSelected,
      setCurrentListSelected: this.setCurrentListSelected,
    };
    return (
      <div className="App">
        <MovieNightContext.Provider value={contextValue}>
          <nav className="App_nav">
            <MovieListNav
              lists={this.state.lists}
              movies={this.state.movies}
              handleAddList={this.handleAddList}
            />
          </nav>
          <main className="App_Main">
            <Switch>
              <Route exact path={"/"} component={Search} />
              <Route path={"/login"} component={LoginForm} />
              <Route path="/registration" component={RegistrationForm} />
              <Route
                path="/list/:listId"
                render={(routeProps) => {
                  return (
                    <MovieList
                      movies={getMoviesForList(
                        this.state.movies,
                        routeProps.match.params.listId
                      )}
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
