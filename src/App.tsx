import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Todo_T } from "./types";
import Todo from "./components/Todo";
import { GoChevronDown } from "react-icons/go";

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

   async function deleteTodo(id: number) {
      console.log("del" + id);
      try {
         const { data } = await axios.delete(`${api}/${id}`)
         get()
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="bg-white m-[130px_0_40px] relative shadow-[0_2px_4px_0] shadow-[#0000001f]">
         <header>
            <h1 className="absolute -top-[140px] w-full text-[80px] font-[200] text-center">
               todos
            </h1>
            <div className="relative flex items-center">
               <input
                  className="p-[16px] pl-[60px] italic w-full shadow-md text-[24px] input-title outline-1 outline-[#949494]"
                  type="text"
                  placeholder="What need to be done?"
               />
               {todos.length && (
                  <GoChevronDown className="absolute cursor-pointer text-[28px] text-[#949494] left-[10px]" />
               )}
            </div>
         </header>
         <section>
            {todos.length ? (
               <ul className="">
                  {todos.map((todo: Todo_T) => {
                     return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />;
                  })}
               </ul>
            ) : (
               <div>Loading...</div>
            )}
         </section>
      </div>
   );
}

export default App;
