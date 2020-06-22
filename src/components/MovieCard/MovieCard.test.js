import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import MovieCard from "./MovieCard";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const movie = {
    id: 1,
    title: "Ad Astra",
    overview:
      "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.",
    genre: "Science Fiction",
    runtime: "123 minutes",
    poster_path: "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
    movielist_id: 0,
    votes: 0,
  };
  ReactDOM.render(
    <BrowserRouter>
      <MovieCard movieData={movie} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
