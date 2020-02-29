import React from "react";

export interface Context {
  dispatch: (action: string) => void;
  cardId: number;
  goBack: () => void;
}

export const DEFAULT_VALUE = {
  dispatch: () => {},
  cardId: 0,
  goBack: () => {}
};

export const NavButtonContext = React.createContext<Context>(DEFAULT_VALUE);
