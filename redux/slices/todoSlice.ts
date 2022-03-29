import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import Todo from "../../model/Todo";
import Column from "../../model/Column";

type AddPayload = {
  todo: Todo,
  columnId: string
}

type RemovePayload = {
  todoId: string,
  columnId: string
}

type EditColumnPayload = {
  columnId: string,
  title: string
}

type SwapTodoPayload = {
  todoId: string,
  sourceColumnId: string, 
  destinationColumnId: string, 
  sourceIndex: number, 
  destinationIndex: number
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [] as Todo[],
    columns: [] as Column[],
    columnOrder: [] as string[]
  },
  reducers: {
    add: (state, action: PayloadAction<AddPayload>) => { 
      const { todo, columnId } = action.payload
      const column: Column | undefined = state.columns.filter(column => column.id === columnId)[0]
      if (typeof column === "undefined") {
        return
      }
      state.todos.push(todo)
      column.todoIds.push(todo.id)
    },
    remove: (state, action: PayloadAction<RemovePayload>) => {
      const { todoId, columnId } = action.payload
      const column: Column | undefined = state.columns.filter(column => column.id === columnId)[0]
      if (typeof column === "undefined") {
        return
      }
      state.todos = state.todos.filter(todo => todo.id != todoId)
      column.todoIds = column.todoIds.filter(id => id != todoId)
    },
    done: (state, action: PayloadAction<string>) =>
      { state.todos = state.todos.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo) },     
    edit: (state, action: PayloadAction<EditTodoPayload>) => {
      state.todos = state.todos.map(todo => todo.id === action.payload.id ? {
        ...todo, 
        title: action.payload.title, 
        description: action.payload.description 
      } : todo)
    },
    addColumn: ({ columns, columnOrder }, action: PayloadAction<Column>) => {
      columns.push(action.payload)
      columnOrder.push(action.payload.id)
    },
    editColumn: ({ columns }, action: PayloadAction<EditColumnPayload>) =>
      { columns = columns.map(column => column.id == action.payload.columnId ? { ...column, title: action.payload.title } : column) },
    removeColumn: (state, action: PayloadAction<string>) => ({
      ...state,
      columns: state.columns.filter(column => column.id != action.payload),
      columnOrder: state.columnOrder.filter(columnId => columnId != action.payload)
    }),
    swapTodo: (state, action: PayloadAction<SwapTodoPayload>) => {
      const { todoId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = action.payload;      
      let sourceColumn: Column | undefined = state.columns.filter(column => column.id === sourceColumnId)[0];
      if (typeof sourceColumn === "undefined") {
        return;
      }
      let destinationColumn: Column | undefined = state.columns.filter(column => column.id === destinationColumnId)[0];
      if (typeof destinationColumn === "undefined") {
        return;
      }

      sourceColumn.todoIds.splice(sourceIndex, 1);
      destinationColumn.todoIds.splice(destinationIndex, 0, todoId);
    }
  },
});

export const { add, remove, done, edit, addColumn, editColumn, removeColumn, swapTodo } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todo;
export type EditTodoPayload = {
  id: string;
  title: string;
  description: string;
}
export default todoSlice.reducer;
