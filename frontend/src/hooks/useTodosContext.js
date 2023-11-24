import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";

export const useTodosContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw Error("useTodosContext must be used inside an TodosContextProvider");
  }

  return context;
};
