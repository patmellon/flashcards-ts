import React from "react";
import { Button } from "semantic-ui-react";

const CardDetails = props => {
  return (
    <div className="col-md-4 offset-md-4" key={props.card.id}>
      <div
        className={
          "card mb-4 box-shadow " + (props.hideAnswer ? "" : "flipped")
        }
      >
        <div className={props.hideAnswer ? "card-body" : "card-body back"}>
          <div>
            <h1 className="card-text">{props.card.method}</h1>
            <hr />
            {props.hideAnswer ? "" : props.card.description}
            <div className="d-flex justify-content-between align-items-center">
              <center>
                <br />

                {props.hideAnswer ? (
                  <Button positive onClick={props.flipCard}>
                    Reveal Answer
                  </Button>
                ) : (
                  <Button negative onClick={props.flipCard}>
                    Hide Answer
                  </Button>
                )}

                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={props.toggleNotes}
                >
                  Notes
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
