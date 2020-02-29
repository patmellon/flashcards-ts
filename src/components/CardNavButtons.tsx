import React from "react";
import { Button, Icon, Divider, Grid } from "semantic-ui-react";

interface Props {
  showNotes: boolean;
  goBack: () => void;
  dispatch(action: string): Function;
}

const CardNavButtons = ({ showNotes, goBack, dispatch }: Props) => {
  return (
    <div>
      <Divider />
      <Grid
        centered
        style={{
          paddingTop: "20px"
        }}
      >
        <Button.Group textAlign="center">
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
        </Button.Group>
      </Grid>
    </div>
  );
};

export default CardNavButtons;
