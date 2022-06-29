import "@testing-library/jest-dom";
import type { DropResult } from "react-beautiful-dnd";
import { onDragEnd } from "../lib/beautifulDnD";
import { setupStore } from '../redux/store';
import type { AppStore } from '../redux/store';
import { addColumn } from "../redux/slices/todoSlice";
import { render, screen, act, within, fireEvent } from "../utils/test-utils";
import Home from "../pages/index";
import Column from "../model/Column";

describe("Test columns functionalities", () => {
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
    render(<Home />, { store });
  });

  it ("It should swap the columns", async () => {
    const result: DropResult = {
      draggableId: "column-1", 
      source: {
        droppableId: "main",
        index: 0
      }, 
      destination: {
        droppableId: "main",
        index: 1
      }, 
      type: "column",
      reason: "DROP",
      mode: "FLUID"
    };

    await act(async () => {
      if (store !== null) {
        onDragEnd(result, store);
      }
    });

    const renderedColumns2 = screen.queryAllByText(/Column test/i);
    expect(renderedColumns2).toHaveLength(2);
    expect(renderedColumns2[0].innerHTML).toEqual("Column test 2");
    expect(renderedColumns2[1].innerHTML).toEqual("Column test 1");  
  });

  it ("It should not swap columns if the source equals the destination", async () => {
    const result: DropResult = {
      draggableId: "column-1", 
      source: {
        droppableId: "main",
        index: 0
      }, 
      destination: {
        droppableId: "main",
        index: 0
      }, 
      type: "column",
      reason: "DROP",
      mode: "FLUID"
    };

    await act(async () => {
      if (store !== null) {
        onDragEnd(result, store);
      }
    });

    const renderedColumns2 = screen.queryAllByText(/Column test/i);
    expect(renderedColumns2).toHaveLength(2);
    expect(renderedColumns2[0].innerHTML).toEqual("Column test 1");
    expect(renderedColumns2[1].innerHTML).toEqual("Column test 2");  
  });

  it ("It should not swap columns if destination is null", async () => {
    const result: DropResult = {
      draggableId: "column-1", 
      source: {
        droppableId: "main",
        index: 0
      }, 
      destination: undefined,
      type: "column",
      reason: "DROP",
      mode: "FLUID"
    };

    await act(async () => {
      if (store !== null) {
        onDragEnd(result, store);
      }
    });

    const renderedColumns2 = screen.queryAllByText(/Column test/i);
    expect(renderedColumns2).toHaveLength(2);
    expect(renderedColumns2[0].innerHTML).toEqual("Column test 1");
    expect(renderedColumns2[1].innerHTML).toEqual("Column test 2");  
  });

  it ("It should not swap columns if type is column and destination is different from main", async () => {
    const result: DropResult = {
      draggableId: "column-1", 
      source: {
        droppableId: "main",
        index: 0
      }, 
      destination: {
        droppableId: "column",
        index: 0
      },
      type: "column",
      reason: "DROP",
      mode: "FLUID"
    };

    await act(async () => {
      if (store !== null) {
        onDragEnd(result, store);
      }
    });

    const renderedColumns2 = screen.queryAllByText(/Column test/i);
    expect(renderedColumns2).toHaveLength(2);
    expect(renderedColumns2[0].innerHTML).toEqual("Column test 1");
    expect(renderedColumns2[1].innerHTML).toEqual("Column test 2");
  });

  it ("It should remove a column 2", async () => {
    const columnsOptions = screen.getAllByLabelText<HTMLButtonElement>("options");
    act(() => {
      fireEvent.click(columnsOptions[1]);
    });

    const deleteButton = screen.getAllByText("Delete");
    await act(async () => {
      fireEvent.click(deleteButton[1]);
    });
    
    const renderedColumns = screen.queryAllByText(/Column test/i);
    expect(renderedColumns).toHaveLength(1);
    expect(renderedColumns[0].innerHTML).toEqual("Column test 1");
  });

  it ("It should edit column 2 title", async () => {
    const columnsOptions = screen.getAllByLabelText<HTMLButtonElement>("options");
    act(() => {
      fireEvent.click(columnsOptions[1]);
    });

    const editButton = screen.getAllByText("Edit");
    await act(async () => {
      fireEvent.click(editButton[1]);
    });

    const editColumnInput = screen.getByPlaceholderText("Change column title");
    await act(async () => {
      fireEvent.change(editColumnInput, { target: { value: "Column test 2 edited" } });
    });

    const saveButton = screen.getByLabelText("save-column");
    await act(async () => {
      fireEvent.click(saveButton);
    });
    
    const renderedColumns = screen.queryAllByText(/Column test/i);
    expect(renderedColumns).toHaveLength(2);
    expect(renderedColumns[1].innerHTML).toEqual("Column test 2 edited");
  });
});