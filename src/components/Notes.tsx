import React, { useContext } from "react";
import { Card, Button, TextArea, Icon } from "semantic-ui-react";
import { CardContext } from "../context/CardContext";

const Notes = () => {
  const context = useContext(CardContext);
  const {
    cardId,
    notes,
    inputNotes,
    submitUpdate,
    cardIndex,
    toggleNotes,
    response
  } = context;
  const cardHeader = response[cardIndex].content[cardId].method;

  return (
    <Card centered>
      <Card.Content>
        <Card.Header>{cardHeader}</Card.Header>
        <Card.Description>
          <TextArea
            onChange={inputNotes}
            value={notes}
            style={{ minHeight: 100 }}
          />
        </Card.Description>
        <Button.Group>
          <Button negative onClick={toggleNotes}>
            <Icon name="cancel" />
          </Button>
          <Button positive onClick={submitUpdate}>
            <Icon name="save" />
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default Notes;
