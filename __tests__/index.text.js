import Home from "../pages/index";
import "@testing-library/jest-dom";
import { render, screen } from "../utils/test-utils";
import { setupStore } from '../redux/store';

describe("Test board page", () => {
  it("Creates a column", () => {
    const store = setupStore();

    render(<Home />, { store });
    expect(screen.getByText(/Add column/i)).toBeInTheDocument();
  });
});