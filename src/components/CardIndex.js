import React from "react";
import { Card, Button } from "semantic-ui-react";

const CardIndex = props => {
  const startingCards = props.startingCards.map((card, i) => {
    return (
      <Card key={card}>
        <Card.Content>
          <Card.Header>{props.startingCards[i]}</Card.Header>
          <Card.Description>
            <Button onClick={props.setCardIndex.bind(this, i)}>View</Button>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  });
  return <Card.Group>{startingCards}</Card.Group>;
};

export default CardIndex;
