import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import MovieList from "../MovieList/MovieList";
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
    votes: 0,
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

  render() {
    const contextValue = {
      lists: this.state.lists,
      movies: this.state.movies,
      currentListSelected: this.state.currentListSelected,
      setCurrentListSelected: this.setCurrentListSelected,
      votes: this.votes,
    };
    return (
      <div className="App">
        <MovieNightContext.Provider value={contextValue}>
          <main className="App_Main">
            <Switch>
              <Route exact path={"/"} component={LoginForm} />
              <Route path={"/search"} render={() => {
                return (
                  <Search
                    lists={this.state.lists}
                    handleAddList={this.handleAddList}
                  />
                );
              }} />
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
