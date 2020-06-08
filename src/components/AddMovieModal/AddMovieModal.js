import React from 'react';
import './AddMovieModal.css'

export default function Modal(props) {
    return (
      <div className="addmovie-modal">
        <section className="modal_content">{props.children}</section>
        <button className="addMovieModal-btn" onClick={props.onAddMovie}>
          Add Movie
        </button>
        <button className="cancelMovieModal-btn" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    );
    }
;