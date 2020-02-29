import React from "react";
import { Container, Header, Grid } from "semantic-ui-react";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Container
      text
      style={{
        paddingTop: "20px"
      }}
    >
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h2" textAlign="center">
              JS Flashcards
            </Header>
            {children}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Layout;
