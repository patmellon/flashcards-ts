import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { createHashHistory } from "history";
import CardIndex from "./components/CardIndex";
import CardsContainer from "./components/CardsContainer";
import Loading from "./components/Loading";
import data from "./data/data";

let api = require("./utils/api");
let history = createHashHistory();

class App extends Component {
  state = {
    startingCards: [],
    response: [],
    loading: true,
    collapsed: true,
    cardIndex: null,
    hideAnswer: true,
    cardId: 0,
    showNotes: false,
    notes: ""
  };

  componentDidMount = () => {
    this.setState({
      response: data,
      loading: false,
      startingCards: this.startingCards(data)
    });
  };

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
    if (!this.state.hideAnswer) {
      this.setState({ hideAnswer: true });
    }
    this.setState({ cardId: 0, showNotes: false });
  };

  setCardIndex = i => {
    this.setState({ cardIndex: i });
    this.showCardsRoute();
  };

  nextCard = () => {
    let currentCardId = this.state.cardId;
    let cardSetLength = this.state.response[this.state.cardIndex].content
      .length;

    if (currentCardId <= cardSetLength - 1) {
      this.setState({ cardId: currentCardId + 1 });
    }

    if (currentCardId === cardSetLength - 1) {
      this.setState({ cardId: 0 });
    }
  };

  previousCard = () => {
    let currentCardId = this.state.cardId;
    let cardSetLength = this.state.response[this.state.cardIndex].content
      .length;

    if (currentCardId <= cardSetLength - 1) {
      this.setState({ cardId: currentCardId - 1 });
    }

    if (this.state.cardId === 0) {
      this.setState({ cardId: cardSetLength - 1 });
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

  render() {
    const {
      startingCards,
      loading,
      response,
      cardIndex,
      hideAnswer,
      cardId,
      showNotes,
      notes
    } = this.state;
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
              </Container>
            </div>
          </HashRouter>
        </div>
      </div>
    );
  }
}

export default App;
