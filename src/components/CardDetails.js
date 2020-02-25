import React, { useState, setState } from "react";
import { Card, Button, Icon } from "semantic-ui-react";

const CardDetails = props => {
  const [hideAnswer, setHideAnswer] = useState(true);
  const toggleAnswer = () => setHideAnswer(!hideAnswer);

  return (
    <Card>
      <Card.Content>
        <Card.Header>{props.card.method}</Card.Header>
        <Card.Description>
          {hideAnswer ? "" : props.card.description}
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
          <Button basic color="red" onClick={props.toggleNotes}>
            <Icon name="edit" />
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default CardDetails;
