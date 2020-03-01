import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { createHashHistory } from "history";
import CardsLanding from "./components/CardsLanding";
import CardsContainer from "./components/CardsContainer";
import Loading from "./components/Loading";
import Layout from "./components/Layout";
import data from "./data/data";
import { CardContext } from "./context/CardContext";

const api = require("./utils/api");
const history = createHashHistory();

const App = () => {
  const [startingCards, setStartingCards] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardIndex, setCardIndex] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setResponse(data);
    setLoading(false);

    const displayStartingCards = res => {
      return res.reduce((startingCards, card) => {
        startingCards.push(card.group);

        return startingCards;
      }, []);
    };

    setStartingCards(displayStartingCards(data));
  }, []);

  const cardIdReducer = (cardId, action) => {
    const cardSetLength = response[cardIndex].content.length;
    switch (action) {
      case "next":
        if (cardId === cardSetLength - 1) {
          return 0;
        }
        if (cardId <= cardSetLength - 1) {
          return cardId + 1;
        }
      case "previous":
        if (cardId === 0) {
          return cardSetLength - 1;
        }
        if (cardId <= cardSetLength - 1) {
          return cardId - 1;
        }
      case "go back":
        return 0;
      default:
        return 0;
    }
  };

  const [cardId, dispatch] = useReducer(cardIdReducer, 0);

  const showCardsRoute = () => {
    history.push("/cards");
  };

  const goBack = () => {
    history.push("/");
    dispatch("go back");
    setShowNotes(false);
  };

  const setCardIndexOnClick = i => {
    setCardIndex(i);
    showCardsRoute();
  };

  const toggleNotes = () => {
    setShowNotes(!showNotes);
    setNoteState();
  };

  const setNoteState = () => {
    let notes = response[cardIndex].content[cardId].notes;
    if (typeof notes !== "undefined") {
      setNotes(notes);
    } else {
      setNotes("");
    }
  };

  const inputNotes = e => {
    setNotes(e.target.value);
  };

  const setCardObject = () => {
    let cardCollection = response;
    let cardsToUpdate = cardCollection[cardIndex].content;

    let updatedCards = cardsToUpdate.map(card => {
      if (card.id === cardId + 1) {
        return Object.assign({}, card, {
          notes: notes
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

  const submitUpdate = () => {
    api
      .updateNotes(this.setCardObject())
      .then(responseJson => {
        this.handleUpdate(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdate = newCardCollection => {
    setResponse(newCardCollection);
  };

  const state = {
    cardId,
    goBack,
    dispatch,
    notes,
    inputNotes,
    submitUpdate,
    showCardsRoute,
    cardIndex,
    showNotes,
    toggleNotes,
    response
  };

  return (
    <div>
      <HashRouter>
        <Layout>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <CardsLanding
                  startingCards={startingCards}
                  showCardsRoute={showCardsRoute}
                  setCardIndex={setCardIndexOnClick}
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
                  <CardContext.Provider value={state}>
                    <CardsContainer />
                  </CardContext.Provider>
                )
              }
            />
            <Route
              render={function() {
                return <p>Not Found</p>;
              }}
            />
          </Switch>
        </Layout>
      </HashRouter>
    </div>
  );
};

export default App;
