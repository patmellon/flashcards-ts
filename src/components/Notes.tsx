import React, { useContext, useEffect } from "react";
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
    response,
    setNotes,
    showNotes
  } = context;
  const cardHeader = response[cardIndex].content[cardId].method;

  useEffect(() => {
    let notes = response[cardIndex].content[cardId].notes;
    if (typeof notes !== "undefined") {
      setNotes(notes);
    } else {
      setNotes("");
    }
  }, [showNotes]);

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
