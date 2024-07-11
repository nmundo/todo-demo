import { Fragment } from "react";
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

type TodoListProps = {
  todos: Todo[];
  deleteTodo: Function;
  toggleTodo: Function;
  completedType?: boolean;
};

const TodosList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodo,
  completedType = false,
}) => (
  <List>
    {todos.filter(({ completed }) => completed).length === 0 && (
      <ListItem>Get something done!</ListItem>
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
