import "@testing-library/jest-dom";
import type { DropResult } from "react-beautiful-dnd";
import { onDragEnd } from "../lib/beautifulDnD";
import { setupStore } from '../redux/store';
import type { AppStore } from '../redux/store';
import { add, addColumn } from "../redux/slices/todoSlice";
import { render, screen, within, act, fireEvent } from "../utils/test-utils";
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

  it ("It should completed todo 2", async () => {
    const completeTodoButtons = screen.getAllByLabelText<HTMLButtonElement>("complete-todo");
    let completedSymbol = screen.queryByLabelText("completed");
    expect(completedSymbol).toBeNull();

    await act(async () => {
      fireEvent.click(completeTodoButtons[1]);
    });
    
    completedSymbol = screen.queryByLabelText("completed");
    expect(completedSymbol).toBeInTheDocument();
  });

  it ("It should remove todo 2", async () => {
    const removeTodoButtons = screen.getAllByLabelText<HTMLButtonElement>("delete-todo-button");
    await act(async () => {
      fireEvent.click(removeTodoButtons[1]);
    });
    
    const renderedTodos = screen.queryAllByText(/Todo test/i);
    expect(renderedTodos).toHaveLength(1);
    expect(renderedTodos[0].innerHTML).toEqual("Todo test 1");
  });

  it ("It should edit todo 2", async () => {
    const editTodoButtons = screen.getAllByLabelText<HTMLButtonElement>("edit-todo-button");
    await act(async () => {
      fireEvent.click(editTodoButtons[1]);
    });
    
    const titleInput = screen.getByPlaceholderText<HTMLInputElement>("Change todo title");
    const descriptionInput = screen.getByPlaceholderText<HTMLInputElement>("Change todo description");
    await act(async () => {
      fireEvent.change(titleInput, { target: { value: "Todo test 2 edited" } });
      fireEvent.change(descriptionInput, { target: { value: "Task 2 description" } });
    });
    expect(titleInput.value).toEqual("Todo test 2 edited");
    expect(descriptionInput.value).toEqual("Task 2 description");

    const saveButton = screen.getByText<HTMLButtonElement>("Save");
    await act(async () => {
      fireEvent.click(saveButton);
    });
    
    expect(screen.getByText("Todo test 2 edited")).toBeInTheDocument();
    expect(screen.getByText("Task 2 description")).toBeInTheDocument();
  });
});