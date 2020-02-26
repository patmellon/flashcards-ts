import React from "react";
import { Button, Icon, Divider } from "semantic-ui-react";

interface Props {
  showNotes: boolean;
  previousCard: () => void;
  goBack: () => void;
  nextCard: () => void;
}

const CardNavButtons = ({
  showNotes,
  previousCard,
  goBack,
  nextCard
}: Props) => {
  return (
    <div>
      <Divider />
      <div key="{card.id}">
        {showNotes ? (
          ""
        ) : (
          <Button primary onClick={previousCard} id="previous">
            <Icon name="left arrow" />
            Previous
          </Button>
        )}
        <Button onClick={goBack}>Home</Button>
        {showNotes ? (
          ""
        ) : (
          <Button primary onClick={nextCard} id="next">
            Next
            <Icon name="right arrow" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardNavButtons;
