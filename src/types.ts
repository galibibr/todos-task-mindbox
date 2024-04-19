export type Todo_T = {
   id: number;
   title: string;
   completed: boolean;
};

export type TodoProps_T = {
   todo: Todo_T;
   deleteTodo: (id: number) => void;
}
