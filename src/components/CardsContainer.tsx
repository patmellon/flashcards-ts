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
  toggleNotes(): boolean;
  submitUpdate(): boolean;
  inputNotes(): boolean;
  previousCard(): boolean;
  goBack(): boolean;
  nextCard(): boolean;
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
  previousCard,
  goBack,
  nextCard
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
          previousCard={previousCard}
          goBack={goBack}
          nextCard={nextCard}
        />
      }
    </div>
  );
};

export default CardsContainer;
