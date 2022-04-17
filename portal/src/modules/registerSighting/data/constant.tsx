import { createContext, useContext } from "react";
import RegisterSightingStore from "./store";

export const RegisterSightingStoreContext = createContext<RegisterSightingStore | null>(
  null
);

export const useRegisterSightingStore = () => {
  const store = useContext(RegisterSightingStoreContext);
  if (!store) {
    throw new Error("Register Store must be initialised.");
  }
  return store;
};
