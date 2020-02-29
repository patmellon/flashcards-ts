import React, { useContext } from "react";
import { Button, Icon, Divider, Grid } from "semantic-ui-react";
import { NavButtonContext } from "../context/NavButtonContext";

const CardNavButtons = () => {
  const context = useContext(NavButtonContext);
  const { dispatch, goBack } = context;

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
          <Button primary onClick={() => dispatch("previous")} id="previous">
            <Icon />
            Previous
          </Button>
          )}
          <Button onClick={goBack}>Home</Button>
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
