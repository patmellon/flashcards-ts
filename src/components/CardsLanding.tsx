import React from "react";
import { Card, Button } from "semantic-ui-react";

interface Props {
  startingCards: [];
  setCardIndex: (i: number) => void;
  showCardsRoute: () => void;
}

const CardsLanding = ({
  startingCards,
  setCardIndex,
  showCardsRoute
}: Props) => {
  const mappedStartingCards = startingCards.map((card, i) => {
    return (
      <Card key={card}>
        <Card.Content>
          <Card.Header>{startingCards[i]}</Card.Header>
          <Card.Description>
            <Button
              onClick={() => {
                setCardIndex(i);
                showCardsRoute();
              }}
            >
              View
            </Button>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  });
  return <Card.Group centered>{mappedStartingCards}</Card.Group>;
};

export default CardsLanding;
