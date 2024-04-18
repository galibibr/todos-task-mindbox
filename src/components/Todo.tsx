import { TodoProps_T } from "../types";

const Todo = ({ todo }: TodoProps_T) => {
   return <li key={todo.id}>{todo.title}</li>;
};

export default Todo;
