import React from 'react';
import { useState,useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Checkbox, IconButton, TextField, Typography, List } from "@material-ui/core";
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem("todos");
    if (saveTodos) {
      return JSON.parse(saveTodos)
    }
    else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value})
    console.log(currentTodo);
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function handleInputChange(e) {
    setTodo(e.target.value); 
  }

  function handleFormSubmit(e) {

    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length+1,
          text: todo,
          completed: false
        }
      ])
    }

    setTodo("");
  }

  function handleDelete(id){
    const removeTask = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(removeTask);
  }

  function handleDeleteAll(id){
    const removeTask = todos.filter((todos) => {
    })

    setTodos(removeTask);
  }

  function handleEditClick(todo) {
    setEdit(true);
    setCurrentTodo({...todo})
  }

  function handleUpdate(id, updateTodo){
    const updateItem = todos.map((todo) => {
      return todo.id === id ? updateTodo : todo;
    });

    setTodos(updateItem)
    setEdit(false);
  }

  function handleEditFormSubmit(e) {

    e.preventDefault();
    handleUpdate(currentTodo.id, currentTodo);
  }

  return (
    <div className='App'>
      <Typography style={{ padding: 16 }} variant="h1" >
      <Box letterSpacing={15} m={1} >
        ToDay List.
      </Box>
      </Typography>

        {edit ? (
          <form onSubmit={handleEditFormSubmit}>
            <h2>Edit your list.</h2>
            <TextField
              type="text"
              name="editTodo"
              placeholder='Edit'
              value={currentTodo.text}
              onChange={handleEditInputChange}
            />

            <Button type="submit">Update</Button>
            <Button onClick={() => setEdit(false)}>Cancel</Button>
          </form>
        ) : (

          <form onSubmit={handleFormSubmit}>
          <TextField 
            name="todo"
            type="text"
            placeholder='Task'
            value={todo}
            onChange={handleInputChange}
          />
          {" "}
          <Button type="submit" >
            SUBMIT
          </Button>
        </form>

        )}

        
        <List>
          {todos.map((todo) => (
            <li key={todo.id}>
              {/* <Checkbox /> */}
              {" "}
              {todo.text}
              {" "}
              <IconButton onClick={() => handleEditClick(todo)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(todo.id)} edge="end" >
                <DeleteIcon />
              </IconButton>
            </li>
          ))}
          <Button onClick={() => handleDeleteAll(todo.id)}>
            <Box> 
            <h3>All Clear</h3>
            </Box>
          </Button>
        </List>
      

    </div>
  );
}

export default App;
