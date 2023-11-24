import { useEffect } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TodosDetails from "../components/TodosDetails";
import TodoForm from "../components/TodoForm";

const Home = () => {
  const { categoriesTodo, dispatch, todos } = useTodosContext();
  const { user } = useAuthContext();
  console.log("user", user);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        // "http://localhost:4000/api/todos",
        "https://todos-tracker.onrender.com/api/todos",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [todos, user, dispatch]);

  return (
    <div className="home">
      <div className="todos">
        {categoriesTodo &&
          categoriesTodo.map((todo) => (
            <div key={todo.todos[0]._id}>
              <h2>{todo.todos[0].category}</h2>
              {todo.todos &&
                todo.todos.map((item) => (
                  <TodosDetails key={item._id} todo={item} />
                ))}
            </div>
          ))}
      </div>
      <TodoForm />
    </div>
  );
};

export default Home;
