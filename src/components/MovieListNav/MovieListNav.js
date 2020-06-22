import React from "react";
import { NavLink } from "react-router-dom";
import MovieNightContext from "../../MovieNightContext";
import { slide as Menu } from "react-burger-menu";
import TokenService from "../../services/token-service";
import config from "../../config";
import { toast } from "react-toastify";
import trash from "../../images/buttons/icons8-delete-16.png";
import "./MovieListNav.css";

export default class MovieListNav extends React.Component {
  static contextType = MovieNightContext;

  constructor(props) {
    super(props);
    this.state = {
      input: "",
      hasError: false,
      errorMessage: "",
      listValid: false,
    };
  }

  // input change handler
  onInput = (e) => {
    this.setState(
      {
        input: e.target.value,
      },
      () => {
        this.validateEntry(this.state.input);
      }
    );
  };

  // submit handler
  onSubmit = (e) => {
    e.preventDefault();
    const name = this.state.input;
    const list = {
      name: name,
      user_id: this.context.userId,
    };
    fetch(`${config.API_ENDPOINT}/lists`, {
      method: "POST",
      body: JSON.stringify(list),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            console.log(`Error is: ${error}`);
            throw error;
          });
        }
        return res.json();
      })
      .then((data) => {
        this.context.addList(data);
        this.notify();
      })
      .catch((error) => {
        this.setState({ hasError: error });
      });

    e.target.reset();
    this.setState({
      input: "",
    });
  };

  //sets name to display in movielist
  onClick = (context, list) => {
    context.setCurrentListSelected(list);
  };

  validateEntry = (value) => {
    value = value.trim();
    if (value.length < 1) {
      this.setState({
        errorMessage: "",
        listValid: false,
      });
    } else if (value.length > 25) {
      this.setState({
        errorMessage: "please enter shorter list name",
        listValid: false,
      });
    } else {
      this.setState({
        listValid: true,
      });
    }
  };

  handleDeleteList = (listId) => {
    fetch(`${config.API_ENDPOINT}/lists/${listId}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
      })
      .then(() => {
        this.context.deleteList(listId);
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  notify = () =>
    toast("list added!", {
      autoClose: 1500,
      className: "toast-notification",
    });

  render() {
    return (
      <div className="MovieListNav">
        <MovieNightContext.Consumer>
          {(context) => (
            <>
              <Menu>
                <ul className="MovieListNav_list">
                  <h3>Movie Lists</h3>
                  {this.context.lists.map((list) => (
                    <li key={list.id} className="MovieListItem">
                      <NavLink
                        className="MovieListNav_list-link"
                        to={`/list/${list.id}`}
                        onClick={(e) => this.onClick(context, list)}
                      >
                        {list.name}
                      </NavLink>
                      <img
                        className="delete-btn"
                        src={trash}
                        alt="delete button"
                        onClick={() => this.handleDeleteList(list.id)}
                      />
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
                    aria-label="Enter Name for New List"
                  />
                  <button
                    className="newList-btn"
                    type="submit"
                    disabled={!this.state.listValid}
                  >
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
