import React, { useContext } from "react";
import Notes from "./Notes";
import CardNavButtons from "./CardNavButtons";
import CardDetails from "./CardDetails";
import { CardContext } from "../context/CardContext";

const CardsContainer = () => {
  const context = useContext(CardContext);
  const { cardId, cardIndex, showNotes, response } = context;

  const cardDetails = response[cardIndex].content.map(card => {
    return <CardDetails card={card} />;
  });

  return (
    <div>
      {showNotes ? <Notes /> : cardDetails[cardId]}
      {<CardNavButtons />}
    </div>
  );
};

export default CardsContainer;
