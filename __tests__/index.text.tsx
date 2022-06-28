import Home from "../pages/index";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "../utils/test-utils";
import { setupStore } from '../redux/store';

beforeEach(() => {
  const store = setupStore();
  render(<Home />, { store });
});

describe("Test board page", () => {
  it("It should create a column and a todo", async () => {
    // Activates add mode
    act(() => {
      const addModeButton = screen.getByLabelText<HTMLButtonElement>('open-add-column-mode');
      fireEvent.click(addModeButton);
    });

    //Write the column name and checks if the value is changed
    const columnNameInput = screen.getByPlaceholderText<HTMLInputElement>('Insert column title');
    act(() => {
      fireEvent.change(columnNameInput, { target: { value: "Column Test 1" } });
    });
    expect(columnNameInput.value).toEqual("Column Test 1");
      
    // Adds the column to the board and checks if exists    
    const addColumnButton = screen.getByLabelText("add-column");
    await act(async () => {
      fireEvent.click(addColumnButton);
    });
    const addedColumn = screen.queryAllByText("Column Test 1");
    expect(addedColumn).toHaveLength(1);

    // --------------------------------TODO-----------------------------------
    act(() => {
      const addTodoButtonMode = screen.getByLabelText<HTMLButtonElement>("open-add-todo-mode");
      fireEvent.click(addTodoButtonMode);
    });

    //Write the column name and checks if the value is changed
    const todoNameInput = screen.getByPlaceholderText<HTMLInputElement>('Insert todo title');
    act(() => {
      fireEvent.change(todoNameInput, { target: { value: "Todo Test 1" } });
    });
    expect(todoNameInput.value).toEqual("Todo Test 1");

    // Adds the todo to the column and checks if exists    
    const addTodoButton = screen.getByLabelText("add-todo");
    await act(async () => {
      fireEvent.click(addTodoButton);
    });
    const addedTodo = screen.queryAllByText("Todo Test 1");
    expect(addedTodo).toHaveLength(1);
  });

  it("Should not create a column if title field is empty", async () => {
    // Activates add mode
    act(() => {
      const addModeButton = screen.getByLabelText<HTMLButtonElement>('Add card button');
      fireEvent.click(addModeButton);
    });
    
    //Write the column name and checks if the value is changed
    const columnNameInput = screen.getByPlaceholderText<HTMLInputElement>('Insert text');
    expect(columnNameInput.value).toEqual("");

    const addColumnButton = screen.getByLabelText("add-column");
    await act(async () => {
      fireEvent.click(addColumnButton);
    });

    const errorMessage = screen.getByText("Title is required");
    expect(errorMessage).toBeInTheDocument();
  });
});