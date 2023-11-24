import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TodosDetails = ({ todo }) => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    alert("Have you completed task?");
    const response = await fetch(
      "http://localhost:4000/api/todos/" + todo._id,
      //   "https://tracker-ut2f.onrender.com/api/todos/" + todo._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };

  return (
    <div className="todos-details">
      <h4>{todo.title}</h4>
      <p>
        <strong>Description : </strong>
        {todo.Description}
      </p>
      <p>
        <strong>Category : </strong>
        {todo.category}
      </p>
      <p>
        Created at:{" "}
        {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        done
      </span>
    </div>
  );
};

export default TodosDetails;
