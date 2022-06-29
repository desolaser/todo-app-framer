import "@testing-library/jest-dom";
import type { DropResult } from "react-beautiful-dnd";
import { onDragEnd } from "../lib/beautifulDnD";
import { setupStore } from '../redux/store';
import type { AppStore } from '../redux/store';
import { add, addColumn } from "../redux/slices/todoSlice";
import { render, screen, within, act } from "../utils/test-utils";
import Home from "../pages/index";
import Column from "../model/Column";
import Todo from "../model/Todo";

describe("Test todos functionalities", () => {
  let store: AppStore | null = null;

  beforeEach(() => {
    store = setupStore();
    const column1: Column = {
      id: "column-1",
      title: "Column test 1",
      todoIds: []
    };
    const column2: Column = {
      id: "column-2",
      title: "Column test 2",
      todoIds: []
    };
    store.dispatch(addColumn(column1));
    store.dispatch(addColumn(column2));
    
    const todo1: Todo = {
      id: "todo-1",
      title: "Todo test 1",
      description: "task 1",
      isDone: false,
      date: new Date()
    };    
    const todo2: Todo = {
      id: "todo-2",
      title: "Todo test 2",
      description: "task 2",
      isDone: false,
      date: new Date()
    };
    store.dispatch(add({
      todo: todo1,
      columnId: "column-1"
    }))
    store.dispatch(add({
      todo: todo2,
      columnId: "column-1"
    }))

    render(<Home />, { store });

    const column = screen.queryByText("Column test 1");
    expect(column).toBeInTheDocument();

    const todos = screen.queryAllByText(/Todo test/i);
    expect(todos).toHaveLength(2);
    expect(todos[0].innerHTML).toEqual("Todo test 1");
    expect(todos[1].innerHTML).toEqual("Todo test 2");
  });

  it ("It should swap the todos in the same column", async () => {    
    const result: DropResult = {
      draggableId: "todo-1",
      source: {
        droppableId: "column-1",
        index: 0
      },
      destination: {
        droppableId: "column-1",
        index: 1
      },
      type: "todo",
      reason: "DROP",
      mode: "FLUID"
    };

    await act(async () => {
      if (store !== null) {
        onDragEnd(result, store);
      }
    });

    const todos = screen.queryAllByText(/Todo test/i);
    expect(todos).toHaveLength(2);
    expect(todos[0].innerHTML).toEqual("Todo test 2");
    expect(todos[1].innerHTML).toEqual("Todo test 1");
  });

  it ("It should swap the todos in different columns", async () => {    
    const result: DropResult = {
      draggableId: "todo-1",
      source: {
        droppableId: "column-1",
        index: 0
      },
      destination: {
        droppableId: "column-2",
        index: 0
      },
      type: "todo",
      reason: "DROP",
      mode: "FLUID"
    };

    await act(async () => {
      if (store !== null) {
        onDragEnd(result, store);
      }
    });

    const column1 = screen.getByRole("column-1");
    const column2 = screen.getByRole("column-2");

    const todosListCol1 = within(column1).queryAllByText(/Todo test/i);
    expect(todosListCol1).toHaveLength(1);
    expect(todosListCol1[0].innerHTML).toEqual("Todo test 2");

    const todosListCol2 = within(column2).queryAllByText(/Todo test/i);
    expect(todosListCol2).toHaveLength(1);
    expect(todosListCol2[0].innerHTML).toEqual("Todo test 1");
  });  
  
  it ("It should not swap todos if the source equals the destination", async () => {    
    const result: DropResult = {
      draggableId: "todo-1",
      source: {
        droppableId: "column-1",
        index: 0
      },
      destination: {
        droppableId: "column-1",
        index: 0
      },
      type: "todo",
      reason: "DROP",
      mode: "FLUID"
    };

    await act(async () => {
      if (store !== null) {
        onDragEnd(result, store);
      }
    });

    const todos = screen.queryAllByText(/Todo test/i);
    expect(todos).toHaveLength(2);
    expect(todos[0].innerHTML).toEqual("Todo test 1");
    expect(todos[1].innerHTML).toEqual("Todo test 2");
  });
  
  it ("It should not swap the todos in main container", async () => {    
    const result: DropResult = {
      draggableId: "todo-1",
      source: {
        droppableId: "column-1",
        index: 0
      },
      destination: {
        droppableId: "main",
        index: 0
      },
      type: "todo",
      reason: "DROP",
      mode: "FLUID"
    };

    await act(async () => {
      if (store !== null) {
        onDragEnd(result, store);
      }
    });

    const todos = screen.queryAllByText(/Todo test/i);
    expect(todos).toHaveLength(2);
    expect(todos[0].innerHTML).toEqual("Todo test 1");
    expect(todos[1].innerHTML).toEqual("Todo test 2");
  });
  
  it ("It should not swap the todos if destination is null", async () => {    
    const result: DropResult = {
      draggableId: "todo-1",
      source: {
        droppableId: "column-1",
        index: 0
      },
      destination: undefined,
      type: "todo",
      reason: "DROP",
      mode: "FLUID"
    };

    await act(async () => {
      if (store !== null) {
        onDragEnd(result, store);
      }
    });

    const todos = screen.queryAllByText(/Todo test/i);
    expect(todos).toHaveLength(2);
    expect(todos[0].innerHTML).toEqual("Todo test 1");
    expect(todos[1].innerHTML).toEqual("Todo test 2");
  });
});