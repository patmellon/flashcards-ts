import React, { useReducer } from "react";
import { Button, Icon, Divider } from "semantic-ui-react";

interface Props {
  showNotes: boolean;
  goBack: () => void;
  dispatch(action: string): Function;
}

const CardNavButtons = ({ showNotes, goBack, dispatch }: Props) => {
  return (
    <div>
      <Divider />
      <div key="{card.id}">
        {showNotes ? (
          ""
        ) : (
          <Button primary onClick={() => dispatch("previous")} id="previous">
            <Icon />
            Previous
          </Button>
        )}
        <Button onClick={goBack}>Home</Button>
        {showNotes ? (
          ""
        ) : (
          <Button primary onClick={() => dispatch("next")} id="next">
            Next
            <Icon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardNavButtons;
