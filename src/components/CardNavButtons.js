import React from "react";

const CardNavButtons = props => {
  return (
    <div className="col-md-4 offset-md-4" key="{card.id}">
      <center>
        <div className="btn-group" role="group">
          {props.showNotes ? (
            ""
          ) : (
            <button
              className="btn btn-outline-secondary"
              onClick={props.previousCard}
              id="previous"
            >
              <i className="fa fa-angle-left fa-3x" />
            </button>
          )}
          <button className="btn btn-outline-primary" onClick={props.goBack}>
            Home
          </button>
          {props.showNotes ? (
            ""
          ) : (
            <button
              className="btn btn-outline-secondary"
              onClick={props.nextCard}
            >
              <i className="fa fa-angle-right fa-3x" />
            </button>
          )}
        </div>
      </center>
    </div>
  );
};

export default CardNavButtons;
