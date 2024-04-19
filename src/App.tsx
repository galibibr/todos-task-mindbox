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
   const [filter, setFilter] = useState("all");
   const leftLengthTodos = todos.filter(
      (todo: Todo_T) => todo.completed === false
   ).length;

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
         await axios.delete(`${api}/${id}`);
         get();
      } catch (error) {
         console.log(error);
      }
   }

   async function completeTodo(todo: Todo_T) {
      try {
         await axios.put(`${api}/${todo.id}`, {
            title: todo.title,
            completed: !todo.completed,
         });
         get();
      } catch (error) {
         console.log(error);
      }
   }

   async function addTodo(todo: Todo_T) {
      try {
         await axios.post(api, todo);
         get();
      } catch (error) {
         console.log(error);
      }
   }

   // Clear completed
   function handleClearCompleted() {
      todos
         .filter((todo: Todo_T) => todo.completed)
         .forEach((todo: Todo_T) => todo.id && deleteTodo(todo.id));
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
               {todos.length ? (
                  <GoChevronDown className="absolute cursor-pointer text-[28px] text-[#949494] left-[10px]" />
               ) : (
                  ""
               )}
            </div>
         </header>
         <section>
            <ul className="">
               {todos
                  .filter((todo: Todo_T) => {
                     switch (filter) {
                        case "active":
                           return !todo.completed;
                        case "completed":
                           return todo.completed;
                        default:
                           return todo;
                     }
                  })
                  .map((todo: Todo_T) => {
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
         </section>
         {todos.length ? (
            <footer className="p-[10px_15px] flex justify-between items-center text-center text-[15px] h-[47px]">
               {/* Cnt left items */}
               <span className="float-left">
                  {leftLengthTodos ? leftLengthTodos : "No"}{" "}
                  {`item${leftLengthTodos > 1 ? "s" : ""} left`}
               </span>
               {/* Filter */}
               <ul className="absolute flex justify-center items-start gap-[5px] left-0 right-0">
                  <li
                     onClick={() => setFilter("all")}
                     className={`border ${
                        filter === "all"
                           ? "border-[#949494]"
                           : "border-transparent"
                     } hover:border-[#949494] p-[2px_7px] cursor-pointer rounded-[3px]`}>
                     All
                  </li>
                  <li
                     onClick={() => setFilter("active")}
                     className={`border ${
                        filter === "active"
                           ? "border-[#949494]"
                           : "border-transparent"
                     } hover:border-[#949494] p-[2px_7px] cursor-pointer rounded-[3px]`}>
                     Active
                  </li>
                  <li
                     onClick={() => setFilter("completed")}
                     className={`border ${
                        filter === "completed"
                           ? "border-[#949494]"
                           : "border-transparent"
                     } hover:border-[#949494] p-[2px_7px] cursor-pointer rounded-[3px]`}>
                     Completed
                  </li>
               </ul>
               {/* Clear */}
               <button
                  onClick={handleClearCompleted}
                  className="float-right cursor-pointer relative hover:underline">
                  Clear completed
               </button>
            </footer>
         ) : (
            ""
         )}
      </div>
   );
}

export default App;
