import React from "react";
import { Card, Button } from "semantic-ui-react";

interface Props {
  startingCards: [];
  setCardIndex: (i: number) => void;
}

const CardIndex = ({ startingCards, setCardIndex }: Props) => {
  const mappedStartingCards = startingCards.map((card, i) => {
    return (
      <Card key={card}>
        <Card.Content>
          <Card.Header>{startingCards[i]}</Card.Header>
          <Card.Description>
            <Button onClick={() => setCardIndex(i)}>View</Button>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  });
  return <Card.Group>{mappedStartingCards}</Card.Group>;
};

export default CardIndex;