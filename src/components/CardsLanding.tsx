import React, { useContext, useState, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import { CardContext } from "../context/CardContext";
import data from "../data/data.json";
import { createHashHistory } from "history";

const history = createHashHistory();

const CardsLanding = () => {
  const context = useContext(CardContext);
  const [startingCards, setStartingCards] = useState([]);
  const { setCardIndexOnClick } = context;

  useEffect(() => {
    const displayStartingCards = (res: any) => {
      return res.reduce((startingCards: any, card: any) => {
        startingCards.push(card.group);

        return startingCards;
      }, []);
    };

    setStartingCards(displayStartingCards(data));
  }, []);

  const showCardsRoute = () => {
    history.push("/cards");
  };

  const mappedStartingCards = startingCards.map((card, i) => {
    return (
      <Card key={card}>
        <Card.Content>
          <Card.Header>{startingCards[i]}</Card.Header>
          <Card.Description>
            <Button
              onClick={() => {
                setCardIndexOnClick(i);
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
