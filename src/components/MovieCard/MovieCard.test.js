import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import MovieCard from "./MovieCard";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <MovieCard />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
