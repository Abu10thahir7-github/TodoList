import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [inputValue, setInputValue] = useState(''); // State to track the input value
  const [descriptionValue, setDescriptionValue] = useState(''); // State to track the description value
  const [editMode, setEditMode] = useState(false); // State to track the edit mode
  const [editIndex, setEditIndex] = useState(null); // State to track the index of the todo being edited
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value in the state
  };

  const handleDescriptionChange = (e) => {
    setDescriptionValue(e.target.value); // Update the description value in the state
  };

  const addTodo = () => {
    if (!inputValue) {
      return alert('Please enter a title');
    }
    if (!descriptionValue) {
      return alert('Please enter a description');
    }
    const newTodos = [...todos, { text: inputValue, description: descriptionValue }];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setInputValue(''); // Reset the input value
    setDescriptionValue(''); // Reset the description value
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleEditClick = (index) => {
    setEditMode(true);
    setEditIndex(index);
    const todo = todos[index];
    setInputValue(todo.text);
    setDescriptionValue(todo.description);
  };
  const handleEdit = () => {
    if (!inputValue) {
      return alert('Please enter a title');
    }
    if (!descriptionValue) {
      return alert('Please enter a description');
    }
    const editedTodos = [...todos];
    editedTodos[editIndex] = { text: inputValue, description: descriptionValue };
    setTodos(editedTodos);
    localStorage.setItem('todos', JSON.stringify(editedTodos));
    setEditMode(false);
    setEditIndex(null);
    setInputValue(''); // Reset the input value
    setDescriptionValue(''); // Reset the description value
  };
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
        <div className="addtodos">
          <div className="inputs">
            <input
              type="text"
              placeholder="title here..."
              value={inputValue}
              onChange={handleInputChange}
              required
            />
            <textarea
              type="text"
              rows={5}
              cols={50}
              placeholder="describe here..."
              value={descriptionValue}
              required
              onChange={handleDescriptionChange}
            />
          </div>

          {editMode ? (
            <button onClick={handleEdit}>Edit</button>
          ) : (
            <button onClick={addTodo}>Add</button>
          )}
         
        </div>
        <div className="todos-list">
          {todos.map((todo, index) => (
            <div key={index} className="todo-item">
      <div className="todos-title">
   <p>title</p>
              <p >{todo.text}</p>
           </div>
           <div className="des-todos">
<p>description</p>
              <p className='desc-todo'>{todo.description}</p>
           </div>
           <div className="todo-bottum">

           <input
  type="checkbox"
  checked={todo.completed}
  onChange={() => handleCheckboxChange(index)}
/>     
              <button onClick={() => handleDelete(index)}>Delete</button>
              
                <button onClick={() => handleEditClick(index)}>Edit</button>
  </div>
             
            
            </div>
          ))}
        </div>

        <div className="completed-todos">
          <h2>Completed Todos</h2>
          {completedTodos.map((todo, index) => (
            <div key={index} className="completed-todo">

              <div className="todos-title">

     
              <p>{todo.text}</p>
              </div>

              <div className="desc-todo">

              <p>{todo.description}</p>
              </div>
              <div className="todo-bottum">

              <button onClick={() => handleDelete(index)}>Delete</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
// Add this function to handle checkbox change

// Update the checkbox input to call handleCheckboxChange
