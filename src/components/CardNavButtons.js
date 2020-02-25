import React from "react";
import { Button, Icon, Divider } from "semantic-ui-react";

const CardNavButtons = props => {
  return (
    <div>
      <Divider />
      <div key="{card.id}">
        {props.showNotes ? (
          ""
        ) : (
          <Button primary onClick={props.previousCard} id="previous">
            <Icon name="left arrow" />
            Previous
          </Button>
        )}
        <Button onClick={props.goBack}>Home</Button>
        {props.showNotes ? (
          ""
        ) : (
          <Button primary onClick={props.nextCard} id="next">
            Next
            <Icon name="right arrow" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardNavButtons;
