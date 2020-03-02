import React, { useState, useEffect, useReducer } from "react";
import { createHashHistory } from "history";
import data from "../data/data.json";

// const api = require("../utils/api");
const history = createHashHistory();

export interface Context {
  dispatch: (action: string) => void;
  cardId: number;
  cardIndex: number;
  goBack: () => void;
  notes: string;
  inputNotes: (e: any) => void;
  submitUpdate: () => void;
  showNotes: boolean;
  toggleNotes: () => void;
  setCardIndexOnClick: (i: number) => void;
  response: {
    content: {
      method: string;
      description: string;
      example: string;
      notes: string;
    }[];
  }[];
}

interface Props {
  children?: React.ReactNode;
}

interface Data {
  content: {
    method: string;
    description: string;
    example: string;
    notes: string;
  }[];
}

const Provider: React.FC<Props> = ({ children }) => {
  const [response, setResponse] = useState<Data[]>([]);
  // const [loading, setLoading] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setResponse(data);
    //setLoading(false);
  }, []);

  const cardIdReducer = (cardId: number, action: string) => {
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

  const goBack = () => {
    history.push("/");
    setShowNotes(false);
  };

  const setCardIndexOnClick = (i: number) => {
    setCardIndex(i);
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

  const inputNotes = (e: any) => {
    setNotes(e.target.value);
  };

  const setCardObject = () => {
    let cardCollection = response;
    let cardsToUpdate = cardCollection[cardIndex].content;

    let updatedCards = cardsToUpdate.map((card: any) => {
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
    /*api
      .updateNotes(this.setCardObject())
      .then(responseJson => {
        this.handleUpdate(responseJson);
      })
      .catch(error => {
        console.log(error);
      }); */
  };

  const handleUpdate = (newCardCollection: any) => {
    setResponse(newCardCollection);
  };

  const state = {
    cardId,
    goBack,
    dispatch,
    notes,
    inputNotes,
    submitUpdate,
    cardIndex,
    showNotes,
    toggleNotes,
    response,
    setCardIndexOnClick
  };

  return <CardContext.Provider value={state}>{children}</CardContext.Provider>;
};

export const withProvider = (Component: any) => {
  const WrapperComponent = (props: any) => {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
  return WrapperComponent;
};

const DEFAULT_STATE = {
  dispatch: () => {},
  cardId: 0,
  cardIndex: 0,
  goBack: () => {},
  notes: "",
  inputNotes: () => {},
  submitUpdate: () => {},
  showNotes: false,
  toggleNotes: () => {},
  response: [],
  setCardIndexOnClick: () => {}
};

export const CardContext = React.createContext<Context>(DEFAULT_STATE);
