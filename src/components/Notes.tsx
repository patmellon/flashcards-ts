import React from "react";
import { Card, Button, TextArea, Icon } from "semantic-ui-react";

interface Props {
  response: { content: { method: string; description: string }[] }[];
  cardIndex: number;
  cardId: number;
  inputNotes: () => void;
  notes: string;
  toggleNotes: () => void;
  submitUpdate: () => void;
}

const Notes = ({
  response,
  cardIndex,
  cardId,
  inputNotes,
  notes,
  toggleNotes,
  submitUpdate
}: Props) => {
  return (
    <Card centered>
      <Card.Content>
        <Card.Header>{response[cardIndex].content[cardId].method}</Card.Header>
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
