import React from 'react';
import MovieCard from '../MovieCard/MovieCard'
import {URL_SEARCH, API_KEY} from "../../movie-helpers";

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesList : [],
            movieIds: [],
            searchTerm: ""
        };
        }

    search = e => {
        e.preventDefault();
        const URL = `${URL_SEARCH}${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=1&include_adult=false `;
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
          <div>
            <h1>Movie Night</h1>
            <form onSubmit={this.search}>
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