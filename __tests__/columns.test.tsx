import "@testing-library/jest-dom";
import type { DropResult } from "react-beautiful-dnd";
import { onDragEnd } from "../lib/beautifulDnD";
import { setupStore } from '../redux/store';
import type { AppStore } from '../redux/store';
import { addColumn } from "../redux/slices/todoSlice";
import { render, screen, act } from "../utils/test-utils";
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
});