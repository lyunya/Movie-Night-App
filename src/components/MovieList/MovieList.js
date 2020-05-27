import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { Link } from "react-router-dom";
import './MovieList.css';
import {URL_SEARCH, URL_POPULAR, API_KEY} from "../../movie-helpers";

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesList : [],
            movieIds: [],
            searchTerm: ""
        };
        }
    
    componentDidMount(){
        const popularURL = `${URL_POPULAR}${API_KEY}&language=en-US&page=1`;
        fetch(popularURL)
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
            })
            .then((responseJson) => {
                let titles = responseJson.results.map((item) => item.title).join(', ');
                let movieIds = responseJson.results.map((item) => item.id);
                this.setState({
                    moviesList: titles,
                    movieIds
                })
            });
    }
    search = e => {
        e.preventDefault();
        const URL = `${URL_SEARCH}${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=1&include_adult=false`;
        fetch(URL)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((responseJson) => {
            let titles = responseJson.results.map((item) => item.title).join(', ');
            let movieIds = responseJson.results.map((item) => item.id);
            this.setState({
                moviesList: titles,
                movieIds
            })
          });
    }

    handleChange = e => {
        this.setState({
          searchTerm: e.target.value,
        });
        };

    render(){
        return (
          <div className="movielist-wrapper">
            <Link
              to={"/"}
              style={{ textDecoration: "none" }}
              className="MovieListPageLink"
            >
              <h1>Movie Night</h1>
            </Link>
            <form onSubmit={this.search} className="search-form">
              <input
                placeholder="Search for movies"
                onChange={this.handleChange}
              />
              <button type="submit">Search</button>
            </form>
            {this.state.movieIds.map((movie) => {
              return <MovieCard movieID={movie} key={movie} />;
            })}
          </div>
        );
    }
    
}