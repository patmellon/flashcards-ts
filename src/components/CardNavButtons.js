import React from "react";
import { Button, Icon } from "semantic-ui-react";

const CardNavButtons = props => {
  return (
    <div className="col-md-4 offset-md-4" key="{card.id}">
      <center>
        <div className="btn-group" role="group">
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
      </center>
    </div>
  );
};

export default CardNavButtons;
