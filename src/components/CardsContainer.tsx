import React from "react";
import Notes from "./Notes";
import CardNavButtons from "./CardNavButtons";
import CardDetails from "./CardDetails";

interface Props {
  response: { content: { method: string; description: string }[] }[];
  cardIndex: number;
  cardId: number;
  toggleNotes(): boolean;
  setNoteState(): boolean;
  submitUpdate(): boolean;
  handleUpdate(): boolean;
  inputNotes(): boolean;
  previousCard(): boolean;
  goBack(): boolean;
  nextCard(): boolean;
  showNotes: boolean;
  notes: string;
}

const CardsContainer = ({
  response,
  cardIndex,
  cardId,
  toggleNotes,
  setNoteState,
  submitUpdate,
  handleUpdate,
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
          handleUpdate={handleUpdate}
          notes={notes}
          setNoteState={setNoteState}
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
