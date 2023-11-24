import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TodoForm = () => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const todo = { title, Description, category };
    const response = await fetch("http://localhost:4000/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log("create", json);
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      setCategory("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Todo</h3>
      <label>Todo Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Description :</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={Description}
        className={emptyFields.includes("Description") ? "error" : ""}
      />
      <label>Create Category :</label>
      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields.includes("category") ? "error" : ""}
      />
      <button>Add Todos</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TodoForm;
