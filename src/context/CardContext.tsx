import React, { useState, useEffect, useReducer } from "react";
import { createHashHistory } from "history";
import data from "../data/data.json";

const history = createHashHistory();

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
  const [cardIndex, setCardIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const localStorageCards = window.localStorage.getItem("cards");
    if (localStorageCards) {
      setResponse(JSON.parse(localStorageCards));
    } else {
      setResponse(data);
    }
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
  };

  const closeNotes = () => {
    if (showNotes) {
      setShowNotes(false);
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
    window.localStorage.setItem("cards", JSON.stringify(setCardObject()));
    handleUpdate(setCardObject());
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
    setCardIndexOnClick,
    closeNotes,
    setNotes
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

interface Context {
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
