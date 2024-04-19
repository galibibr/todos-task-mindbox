import { TodoProps_T } from "../types";
import { IoCheckmark } from "react-icons/io5";
import { GoX } from "react-icons/go";
import '../App.css'

const Todo = ({ todo, deleteTodo }: TodoProps_T) => {
   return (
      <li
         className="relative todo text-[24px] border-b border-solid border-[#ededed]"
         key={todo.id}>
         <div className="relative flex items-center">
            <label
               className={`p-[15px] pl-[60px] block leading-8 ${
                  todo.completed ? "text-[#949494] line-through" : ""
               }`}>
               {todo.title}
            </label>
            {/* check */}
            <div
               className={`absolute flex items-center cursor-pointer justify-center left-[8px] rounded-full w-[32px] h-[32px] border ${
                  todo.completed ? "border-[#3ca78c]" : "border-[#949494]"
               }`}>
               {todo.completed && <IoCheckmark className="text-[#3ca78c]" />}
            </div>
            {/* delete */}
            <div className="absolute end-[20px]">
               <GoX onClick={() => deleteTodo(todo.id)} className="ic-del hidden text-[#949494] hover:text-black" />
            </div>
         </div>
      </li>
   );
};

export default Todo;
