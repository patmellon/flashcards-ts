import React, { useContext } from "react";
import { Button, Icon, Divider, Grid } from "semantic-ui-react";
import { CardContext } from "../context/CardContext";

const CardNavButtons = () => {
  const context = useContext(CardContext);
  const { dispatch, goBack, closeNotes } = context;

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
          <Button
            primary
            onClick={() => {
              dispatch("previous");
              closeNotes();
            }}
          >
            <Icon name="arrow alternate circle left outline" />
          </Button>
          )}
          <Button
            onClick={() => {
              dispatch("go back");
              goBack();
            }}
          >
            Home
          </Button>
          <Button
            primary
            onClick={() => {
              dispatch("next");
              closeNotes();
            }}
          >
            <Icon name="arrow alternate circle right outline" />
          </Button>
          )}
        </Button.Group>
      </Grid>
    </div>
  );
};

export default CardNavButtons;
