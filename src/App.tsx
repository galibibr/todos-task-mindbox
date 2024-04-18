import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Todo_T } from "./types";
import Todo from "./components/Todo";

function App() {
   const [todos, setTodos] = useState<Todo_T[]>([]);
   const api = import.meta.env.VITE_API_URL;

   async function get() {
      try {
         const { data } = await axios.get(api);
         setTodos(data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      get();
   }, []);

   return (
      <>
         <h1>todos</h1>
         {todos.length ? (
            <ul>
               {todos.map((todo: Todo_T) => {
                  return <Todo key={todo.id} todo={todo} />;
               })}
            </ul>
         ) : (
            <div>Loading...</div>
         )}
      </>
   );
}

export default App;
