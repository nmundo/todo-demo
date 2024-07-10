import React, { Fragment } from "react";
import {
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  List,
  ListItemText,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Todo } from "./App";

interface TodosListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  completedType?: boolean;
}

const TodosList: React.FC<TodosListProps> = ({
  todos,
  deleteTodo,
  toggleTodo,
  completedType = false,
}) => (
  <List>
    {todos.filter(({ completed }) => completed).length === 0 && (
      <ListItem>Add some tasks!</ListItem>
    )}
    {todos
      .filter(({ completed }) => completedType === completed)
      .map(({ id, text, completed }, index) => (
        <Fragment key={id}>
          {index !== 0 && <Divider />}
          <ListItem
            secondaryAction={
              <IconButton
                onClick={() => deleteTodo(id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => toggleTodo(id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={completed}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText id={id} primary={text} />
            </ListItemButton>
          </ListItem>
        </Fragment>
      ))}
  </List>
);

export default TodosList;
