import React from 'react';
import { URL_DETAIL,URL_IMAGE, API_KEY } from "../../movie-helpers";
import './MovieCard.css'

export default class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieData: {},
        };
    }

    componentDidMount(){
        fetch(
          `${URL_DETAIL}${this.props.movieID}${API_KEY}&language=en-US`
        )
        .then((res) => {
          if (res.ok) {
            return res.json();
            
          }
        })
        .then(responseJson => {
            this.setState({ movieData: responseJson });
            console.log(responseJson, 'this is the responseJson')
        })
    }

    render(){
        return (
          <div className="moviecard">
            <img
              alt={`movie poster`}
              src={URL_IMAGE + this.state.movieData.poster_path}
              className="movieposter"
            />
            <div className="movietext">
              <h2 className="movietitle">{this.state.movieData.title}</h2>
              <p className="movieoverview">{this.state.movieData.overview}</p>
            </div>
          </div>
        );
    }

}