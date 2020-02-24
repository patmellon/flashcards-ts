import React from "react";

const CardIndex = props => {
  const startingCards = props.startingCards.map((card, i) => {
    return (
      <div className="col-md-4" key={card}>
        <div className="card mb-4 box-shadow">
          <div className="card-body">
            <h1 className="card-text">{props.startingCards[i]}</h1>

            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={props.setCardIndex.bind(this, i)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">{startingCards}</div>
      </div>
    </div>
  );
};

export default CardIndex;
