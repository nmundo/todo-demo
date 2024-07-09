import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Card,
} from "@mui/material";
import TodosList from "./TodosList";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const newTodo = {
      id: crypto.randomUUID(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <Container maxWidth="sm" sx={{ paddingBottom: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">To Do List</Typography>
        </Grid>
        <Grid item xs={12} md={10}>
          <TextField
            value={todo}
            onChange={(event) => setTodo(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && addTodo()}
            size="small"
            placeholder="Type in something..."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => addTodo()}
            fullWidth
          >
            Add
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TodosList
              todos={todos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Completed</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TodosList
              todos={todos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              completedType
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
