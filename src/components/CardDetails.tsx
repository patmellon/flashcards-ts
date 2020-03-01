import React, { useState, useContext } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { CardContext } from "../context/CardContext";

interface Props {
  card: {
    method: string;
    description: string;
  };
}

const CardDetails = ({ card }: Props) => {
  const context = useContext(CardContext);
  const { toggleNotes } = context;

  const [hideAnswer, setHideAnswer] = useState(true);
  const toggleAnswer = () => {
    setHideAnswer(!hideAnswer);
  };

  return (
    <Card centered>
      <Card.Content>
        <Card.Header>{card.method}</Card.Header>
        <Card.Description>
          {hideAnswer ? "" : card.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          {hideAnswer ? (
            <Button basic color="green" onClick={toggleAnswer}>
              Reveal Answer
            </Button>
          ) : (
            <Button basic color="green" onClick={toggleAnswer}>
              Hide Answer
            </Button>
          )}
          <Button basic color="red" onClick={toggleNotes}>
            <Icon name="edit" />
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default CardDetails;
