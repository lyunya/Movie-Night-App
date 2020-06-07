import React from 'react';
import './AddMovieModal.css'

export default function Modal(props) {
    return (
      <div className="addmovie-modal">
        <header>Select a list to add Movie</header>
        <section className="modal_content">{props.children}</section>
        {props.canAddMovie && (
          <button className="addMovieModal-btn" onClick={props.onAddMovie}>
            Add Movie
          </button>
        )}
        {props.canCancel && (
          <button className="cancelMovieModal-btn" onClick={props.onCancel}>
            Cancel
          </button>
        )}
      </div>
    );
    }
;