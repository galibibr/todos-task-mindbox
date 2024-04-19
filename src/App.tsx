import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Todo_T } from "./types";
import Todo from "./components/Todo";
import { GoChevronDown } from "react-icons/go";

function App() {
   const [todos, setTodos] = useState<Todo_T[]>([]);
   const api = import.meta.env.VITE_API_URL;
   // const [title, setTitle] = useState<string>("");

   async function get() {
      try {
         const { data } = await axios.get(api);
         setTodos(data);
      } catch (error) {
         console.log(error);
      }
   }

   async function deleteTodo(id: number) {
      try {
         const { data } = await axios.delete(`${api}/${id}`);
         get();
      } catch (error) {
         console.log(error);
      }
   }

   async function completeTodo(todo: Todo_T) {
      try {
         const { data } = await axios.put(`${api}/${todo.id}`, {
            title: todo.title,
            completed: !todo.completed,
         });
         console.log(data);
         get();
      } catch (error) {
         console.log(error);
      }
   }

   async function addTodo(todo: Todo_T) {
      try {
         const { data } = await axios.post(api, todo);
         get();
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      get();
   }, []);

   // get title with useState
   // function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
   //    event.preventDefault();
   //    setTitle(event.target.value);
   // }

   // get title with target
   function handleSubmit(
      event: React.BaseSyntheticEvent<Event, EventTarget & HTMLFormElement>
   ) {
      event.preventDefault();

      addTodo({
         title: event.target["title"].value,
         completed: false,
      });
      event.target["title"].value = "";
      // setTitle("");
   }

   return (
      <div className="bg-white m-[130px_0_40px] relative shadow-[0_2px_4px_0] shadow-[#0000001f]">
         <header>
            <h1 className="absolute -top-[140px] w-full text-[80px] font-[200] text-center">
               todos
            </h1>
            <div className="relative flex items-center">
               <form onSubmit={handleSubmit} className="w-full">
                  <input
                     name="title"
                     // onChange={handleChange}
                     // value={title}
                     className="p-[16px] pl-[60px] italic w-full shadow-md text-[24px] input-title outline-1 outline-[#949494]"
                     type="text"
                     placeholder="What need to be done?"
                  />
               </form>
               {todos.length && (
                  <GoChevronDown className="absolute cursor-pointer text-[28px] text-[#949494] left-[10px]" />
               )}
            </div>
         </header>
         <section>
            {todos.length ? (
               <ul className="">
                  {todos.map((todo: Todo_T) => {
                     return (
                        <Todo
                           key={todo.id}
                           todo={todo}
                           deleteTodo={deleteTodo}
                           completeTodo={completeTodo}
                        />
                     );
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
