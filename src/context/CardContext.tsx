import React from "react";

export interface Context {
  dispatch: (action: string) => void;
  cardId: number;
  cardIndex: number;
  goBack: () => void;
  notes: string;
  inputNotes: () => void;
  submitUpdate: () => void;
  showCardsRoute: () => void;
  showNotes: boolean;
  toggleNotes: () => void;
  response: { content: { method: string; description: string }[] }[];
}

export const DEFAULT_VALUE = {
  dispatch: () => {},
  cardId: 0,
  cardIndex: 0,
  goBack: () => {},
  notes: "",
  inputNotes: () => {},
  submitUpdate: () => {},
  showCardsRoute: () => {},
  showNotes: false,
  toggleNotes: () => {},
  response: []
};

export const CardContext = React.createContext<Context>(DEFAULT_VALUE);
