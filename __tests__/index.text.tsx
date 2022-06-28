import Home from "../pages/index";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "../utils/test-utils";
import { setupStore } from '../redux/store';

beforeEach(() => {
  const store = setupStore();
  render(<Home />, { store });
});

describe("Test board page", () => {
  it("Creates a column", async () => {
    // Activates add mode
    act(() => {
      const addModeButton = screen.getByLabelText<HTMLButtonElement>('Add card button');
      fireEvent.click(addModeButton);
    });

    //Write the column name and checks if the value is changed
    const columnNameInput = screen.getByPlaceholderText<HTMLInputElement>('Insert text');
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