function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [completedTodos, setCompletedTodos] = useState([]);

  // Existing code...

  const handleCheckboxChange = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    const completedTodo = updatedTodos[index];
    if (completedTodo.completed) {
      const newCompletedTodos = [...completedTodos, completedTodo];
      setCompletedTodos(newCompletedTodos);

      const filteredTodos = updatedTodos.filter((_, i) => i !== index);
      setTodos(filteredTodos);
      localStorage.setItem('todos', JSON.stringify(filteredTodos));
    }
  };

  return (
    <>
      <div className="title">
        <h3>Todo List</h3>
      </div>
      <div className="todos-con">
        {/* Existing code... */}
        <div className="completed-todos">
          <p>Completed todos: {completedTodos.length}</p>
          {completedTodos.map((todo, index) => (
            <div key={index} className="completed-todo">
              <p>{todo.text}</p>
              <p>{todo.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}