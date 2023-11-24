import { createContext, useReducer } from "react";

export const TodoContext = createContext();

export const TodoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        categoriesTodo: action.payload,
      };
    case "CREATE_TODO":
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, {
    todos: [],
    categoriesTodo: [],
  });

  console.log("Todos state:", state);
  return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
