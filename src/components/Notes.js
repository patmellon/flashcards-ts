import React from "react";
import { Card, Button, TextArea, Icon } from "semantic-ui-react";

const Notes = props => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {props.response[props.cardIndex].content[props.cardId].method}
        </Card.Header>
        <Card.Description>
          <TextArea
            onChange={props.inputNotes}
            value={props.notes}
            style={{ minHeight: 100 }}
          />
        </Card.Description>
        <Button.Group>
          <Button negative onClick={props.toggleNotes}>
            <Icon name="cancel" />
          </Button>
          <Button positive onClick={props.submitUpdate}>
            <Icon name="save" />
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default Notes;
