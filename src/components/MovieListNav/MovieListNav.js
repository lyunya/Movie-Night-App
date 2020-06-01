import React from "react";
import { NavLink } from "react-router-dom";
import MovieNightContext from "../../MovieNightContext";
import "./MovieListNav.css";

export default class MovieListNav extends React.Component {
  static contextType = MovieNightContext;

  constructor(props) {
    super(props);
    this.state = {
      input: "",
      error: "",
    };
  }

  // input change handler
  onInput = (e) =>
    this.setState({
      input: e.target.value,
    });

  // submit handler
  onSubmit = (e) => {
    e.preventDefault();
    this.props.handleAddList(this.state.input);
    e.target.reset();
    this.setState({
      input: "",
    });
  };

  onClick = (context, list) => {
    context.setCurrentListSelected(list);
  };
  render() {
    console.log("lists", this.props.lists);
    return (
      <div className="MovieListNav">
        <MovieNightContext.Consumer>
          {(context) => (
            <>
              <ul className="MovieListNav_list">
                {this.props.lists.map((list) => (
                  <li key={list.id}>
                    <NavLink
                      className="MovieListNav_list-link"
                      to={`/list/${list.id}`}
                      onClick={(e) => this.onClick(context, list)}
                    >
                      {list.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <form onSubmit={this.onSubmit}>
                <input
                  value={this.state.value}
                  onChange={this.onInput}
                  type="text"
                  placeholder="Enter List Name"
                />
                <button type="submit">Create New list</button>
              </form>
            </>
          )}
        </MovieNightContext.Consumer>
      </div>
    );
  }
}
