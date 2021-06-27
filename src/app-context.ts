import React, { useContext } from "react";
import AppApi from "./apis/app";
import AppStore from "./store/app";

interface AppContextType {
  store: AppStore;
  api: AppApi;
}

const AppContext = React.createContext<null | AppContextType>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
}

export default AppContext;