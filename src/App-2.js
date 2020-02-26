import React, { useState, useEffect, useReducer } from "react";
import { Container, Header, Grid } from "semantic-ui-react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { createHashHistory } from "history";
import CardIndex from "./components/CardIndex";
import CardsContainer from "./components/CardsContainer";
import Loading from "./components/Loading";
import data from "./data/data";

let api = require("./utils/api");
let history = createHashHistory();

const App = () => {
  const [startingCards, setStartingCards] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardIndex, setCardIndex] = useState(null);
  const [cardId, setCardId] = useState(0);
  const [showNotes, setShowNotes] = useState(0);
  const [notes, setNotes] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    cardId: cardId
  });

  useEffect(() => {
    setResponse(data);
    setLoading(false);
    setStartingCards(this.startingCards(data));
  });

  startingCards = res => {
    let startingCards = [];
    for (let i = 0; i < res.length; i++) {
      startingCards.push(res[i].group);
    }
    return startingCards;
  };

  showCardsRoute = () => {
    history.push("/cards");
  };

  goBack = () => {
    history.push("/");
    //  if (!this.state.hideAnswer) {
    //    this.setState({ hideAnswer: true });
    //  }
    setCardId(0);
    setshowNotes(false);
  };

  setCardIndex = i => {
    setcardIndex(i);
    this.showCardsRoute();
  };

  reducer = (state, action) => {
    const cardSetLength = response[cardIndex].content.length;
    switch (action.type) {
      case "next":
        if (state.currentCardId <= cardSetLength - 1) {
          return { cardId: state.currentCardId + 1 };
        }

        if (state.currentCardId === cardSetLength - 1) {
          return { cardId: 0 };
        }
      case "previous":
        if (state.currentCardId <= cardSetLength - 1) {
          return { cardId: state.currentCardId - 1 };
        }

        if (state.cardId === 0) {
          return { cardId: cardSetLength - 1 };
        }

      default:
        throw new Error();
    }
  };

  toggleNotes = () => {
    this.setState(prevState => ({
      showNotes: !prevState.showNotes
    }));
    this.setNoteState();
  };

  setNoteState = () => {
    let cardId = this.state.cardId;
    let cardIndex = this.state.cardIndex;
    let notes = this.state.response[cardIndex].content[cardId].notes;
    if (typeof notes !== "undefined") {
      this.setState({ notes: notes });
    } else {
      this.setState({ notes: "" });
    }
  };

  inputNotes = e => {
    this.setState({ notes: e.target.value });
  };

  setCardObject = () => {
    let cardCollection = this.state.response;
    let cardIndex = this.state.cardIndex;
    let cardsToUpdate = cardCollection[cardIndex].content;

    let updatedCards = cardsToUpdate.map(card => {
      if (card.id === this.state.cardId + 1) {
        return Object.assign({}, card, {
          notes: this.state.notes
        });
      } else {
        return card;
      }
    });

    let newCardCollection = cardCollection.map((object, index) => {
      if (index === cardIndex) {
        return Object.assign({}, object, {
          content: updatedCards
        });
      } else {
        return object;
      }
    });
    return newCardCollection;
  };

  submitUpdate = () => {
    api
      .updateNotes(this.setCardObject())
      .then(responseJson => {
        this.handleUpdate(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleUpdate = newCardCollection => {
    this.setState({ response: newCardCollection });
  };

  return (
    <div>
      <div>
        <HashRouter>
          <div>
            <Container
              text
              style={{
                paddingTop: "20px"
              }}
            >
              <Grid>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Header as="h2">JS Flashcards</Header>
                    <Switch>
                      <Route
                        exact
                        path={"/"}
                        render={props => (
                          <CardIndex
                            startingCards={startingCards}
                            showCardsRoute={this.showCardsRoute}
                            setCardIndex={this.setCardIndex}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={"/cards"}
                        render={props =>
                          loading ? (
                            <Loading />
                          ) : (
                            <CardsContainer
                              response={response}
                              showCardsRoute={this.showCardsRoute}
                              cardIndex={cardIndex}
                              hideAnswer={hideAnswer}
                              cardId={cardId}
                              nextCard={this.nextCard}
                              previousCard={this.previousCard}
                              goBack={this.goBack}
                              toggleNotes={this.toggleNotes}
                              showNotes={showNotes}
                              inputNotes={this.inputNotes}
                              notes={notes}
                              submitUpdate={this.submitUpdate}
                            />
                          )
                        }
                      />
                      <Route
                        render={function() {
                          return <p>Not Found</p>;
                        }}
                      />
                    </Switch>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
