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
      hasError: false,
      errorMessage: '',
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
    if(this.state.input.length === 0){
      this.setState({
        errorMessage : 'Please enter List Name'
      })
    } else if (this.state.input.length >= 15){
      this.setState({
        errorMessage: "Please enter shorter List Name",
      });
    } else {    
      this.props.handleAddList(this.state.input);
    }
    e.target.reset();
    this.setState({
      input: "",
    });
  };

  onClick = (context, list) => {
    context.setCurrentListSelected(list);
  };


  render() {
    return (
      <div className="MovieListNav">
        <MovieNightContext.Consumer>
          {(context) => (
            <>
              <ul className="MovieListNav_list">
                <h3>Movie Lists</h3>
                {this.props.lists.map((list) => (
                  <li key={list.id} className="MovieListItem">
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
              <form onSubmit={this.onSubmit} className="newList-form">
                <input
                  className="newList-input"
                  value={this.state.value}
                  onChange={this.onInput}
                  type="text"
                  placeholder="Enter List Name"
                />
                <button type="submit">Create New List</button>
                <p>{this.state.errorMessage}</p>
              </form>
            </>
          )}
        </MovieNightContext.Consumer>
      </div>
    );
  }
}
