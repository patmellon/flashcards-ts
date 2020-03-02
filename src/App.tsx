import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { withProvider } from "./context/CardContext";
import CardsLanding from "./components/CardsLanding";
import CardsContainer from "./components/CardsContainer";
import Layout from "./components/Layout";

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path={"/"} component={CardsLanding} />
          <Route exact path={"/cards"} component={CardsContainer} />
          <Route
            render={function() {
              return <p>Not Found</p>;
            }}
          />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

export default withProvider(App);
