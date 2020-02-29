import React from "react";
import Notes from "./Notes";
import CardNavButtons from "./CardNavButtons";
import CardDetails from "./CardDetails";

interface Props {
  response: { content: { method: string; description: string }[] }[];
  cardIndex: number;
  cardId: number;
  showNotes: boolean;
  notes: string;
  toggleNotes(): Function;
  submitUpdate(): Function;
  inputNotes(): Function;
  goBack(): Function;
  dispatch(): Function;
}

const CardsContainer = ({
  response,
  cardIndex,
  cardId,
  toggleNotes,
  submitUpdate,
  showNotes,
  inputNotes,
  notes,
  goBack,
  dispatch
}: Props) => {
  const cardDetails = response[cardIndex].content.map(card => {
    return <CardDetails card={card} toggleNotes={toggleNotes} />;
  });

  return (
    <div>
      {showNotes ? (
        <Notes
          response={response}
          cardIndex={cardIndex}
          cardId={cardId}
          toggleNotes={toggleNotes}
          inputNotes={inputNotes}
          notes={notes}
          submitUpdate={submitUpdate}
        />
      ) : (
        cardDetails[cardId]
      )}
      {
        <CardNavButtons
          showNotes={showNotes}
          goBack={goBack}
          dispatch={dispatch}
        />
      }
    </div>
  );
};

export default CardsContainer;
