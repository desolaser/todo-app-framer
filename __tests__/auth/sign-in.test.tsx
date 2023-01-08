//import Router from 'next/router';
import { useRouter } from 'next/router';
import SignIn from "../../pages/auth/sign-in";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "../../utils/test-utils";
import { setupStore } from '../../redux/store';
import type { AppStore } from '../../redux/store';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

const pushMock = jest.fn()

describe("Sign in page tests", () => {  
  let store: AppStore | null = null;

  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  
  beforeEach(() => {
    store = setupStore();
    render(<SignIn />, { store });

    emailInput = screen.getByLabelText<HTMLInputElement>('email');
    passwordInput = screen.getByLabelText<HTMLInputElement>('password');
  });
  
  it("It should sign in if all fields are filled with valid data", async () => {
    const email: string = "test@test.cl";
    const password: string = "Aa693341480++--";

    act(() => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });
    });
    expect(emailInput.value).toEqual(email);
    expect(passwordInput.value).toEqual(password);
    
    const loginButton = screen.getByText<HTMLButtonElement>('Login');
    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(screen.getByText("Successful sign in.")).toBeInTheDocument();
  });
});