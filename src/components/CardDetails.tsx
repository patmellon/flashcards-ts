import React, { useState } from "react";
import { Card, Button, Icon } from "semantic-ui-react";

interface Props {
  card: {
    method: string;
    description: string;
  };
  toggleNotes(): Function;
}

const CardDetails = ({ card, toggleNotes }: Props) => {
  const [hideAnswer, setHideAnswer] = useState(true);
  const toggleAnswer = () => {
    setHideAnswer(!hideAnswer);
  };

  return (
    <Card>
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
