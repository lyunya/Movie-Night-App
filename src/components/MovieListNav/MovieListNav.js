import React from "react";
import { NavLink } from "react-router-dom";
import MovieNightContext from "../../MovieNightContext";
import { slide as Menu } from "react-burger-menu";
import "./MovieListNav.css";


export default class MovieListNav extends React.Component {
  static contextType = MovieNightContext;

  constructor(props) {
    super(props);
    this.state = {
      input: "",
      hasError: false,
      errorMessage: "",
      listValid: false
    };
  }

  // input change handler
  onInput = (e) => {    
    this.setState({
      input: e.target.value,
    }, ()=>{
      this.validateEntry(this.state.input)
    }
    )
    
    };

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

  validateEntry = (value) => {
    value = value.trim();
    if (value.length < 1) {
      this.setState({
        errorMessage: "",
        listValid:false
      });
    } else if (value.length > 25){
      this.setState({
        errorMessage: "please enter shorter list name",
        listValid: false,
      });
    } else {
      this.setState({
        listValid: true,
      });
    }
  }

  render() {
    return (
      <div className="MovieListNav">
        <MovieNightContext.Consumer>
          {(context) => (
            <>
              <Menu>
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
                  <button type="submit" disabled={!this.state.listValid}>
                    Create New List
                  </button>
                  <p>{this.state.errorMessage}</p>
                </form>
              </Menu>
            </>
          )}
        </MovieNightContext.Consumer>
      </div>
    );
  }
}
