import React from "react";
import Notes from "./Notes";
import CardNavButtons from "./CardNavButtons";
import CardDetails from "./CardDetails";

const CardsContainer = props => {
  const cardDetails = props.response[props.cardIndex].content.map(card => {
    return <CardDetails card={card} {...props} />;
  });

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        {" "}
        <div className="row">
          {props.showNotes ? (
            <Notes
              response={props.response}
              cardIndex={props.cardIndex}
              cardId={props.cardId}
              toggleNotes={props.toggleNotes}
              inputNotes={props.inputNotes}
              handleUpdate={props.handleUpdate}
              notes={props.notes}
              setNoteState={props.setNoteState}
              submitUpdate={props.submitUpdate}
            />
          ) : (
            cardDetails[props.cardId]
          )}
          {
            <CardNavButtons
              showNotes={props.showNotes}
              previousCard={props.previousCard}
              goBack={props.goBack}
              nextCard={props.nextCard}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;
