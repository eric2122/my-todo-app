import React, { useState, useEffect } from "react";
import { Button, TextField, List, ListItem, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const catImages = [
    'https://placekitten.com/1920/1080',
    'https://placekitten.com/1921/1081',
    'https://placekitten.com/1922/1082',
    // ... restlichen Bilder
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [catImages.length]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTodos([...todos, { task, checked: false }]);
      setTask("");
    }
  };

  const toggleTask = index => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  const removeCompleted = () => {
    setTodos(todos.filter(todo => !todo.checked));
  };

  return (
    <div className="App-header" style={{ backgroundImage: `url(${catImages[backgroundIndex]})` }}>
      <TextField
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Aufgabe"
        style={{
          padding: '10px',
          fontSize: '1.2rem',
          marginRight: '10px',
          backgroundColor: 'yellow',
          color: 'red',
          width: '30%',
          borderRadius: '5px'
        }}
      />
      <Button variant="contained" className="button-custom" color="primary" onClick={addTask}>Aufgabe hinzufügen</Button>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={todo.task + index} className="custom-list-item" style={{ textDecoration: todo.checked ? "line-through" : "none" }}>
            <Checkbox
              checked={todo.checked}
              onChange={() => toggleTask(index)}
            />
            {todo.task}
            <IconButton onClick={() => removeCompleted(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" className="button-custom" color="secondary" onClick={removeCompleted}>Erledigte Aufgaben entfernen</Button>
    </div>
  );
}

export default TodoApp;
