import SignUp from "../../pages/auth/sign-up";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "../../utils/test-utils";
import { setupStore } from '../../redux/store';
import type { AppStore } from '../../redux/store';

describe("Sign up page tests", () => {  
  let store: AppStore | null = null;

  let emailInput: HTMLInputElement;
  let emailConfirmationInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let passwordConfirmationInput: HTMLInputElement;

  const spies: any = {};

  beforeEach(() => {
    store = setupStore();
    render(<SignUp />, { store });

    emailInput = screen.getByLabelText<HTMLInputElement>('email');
    emailConfirmationInput = screen.getByLabelText<HTMLInputElement>('emailConfirmation');
    passwordInput = screen.getByLabelText<HTMLInputElement>('password');
    passwordConfirmationInput = screen.getByLabelText<HTMLInputElement>('passwordConfirmation');
  });

  it("It should sign up if all fields are filled with valid data", async () => {
    const email: string = "test@test.cl";
    const password: string = "Aa693341480++--";

    act(() => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(emailConfirmationInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.change(passwordConfirmationInput, { target: { value: password } });
    });
    expect(emailInput.value).toEqual(email);
    expect(emailConfirmationInput.value).toEqual(email);
    expect(passwordInput.value).toEqual(password);
    expect(passwordConfirmationInput.value).toEqual(password);
    
    const registerButton = screen.getByText<HTMLButtonElement>('Register');
    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(screen.getByText("Successful sign up.")).toBeInTheDocument();
  });

  it("It should not sign in if all fields are empty", async () => {
    const email: string = "";
    const password: string = "";

    act(() => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(emailConfirmationInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.change(passwordConfirmationInput, { target: { value: password } });
    });
    expect(emailInput.value).toEqual(email);
    expect(emailConfirmationInput.value).toEqual(email);
    expect(passwordInput.value).toEqual(password);
    expect(passwordConfirmationInput.value).toEqual(password);
    
    const registerButton = screen.getByText<HTMLButtonElement>('Register');
    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(screen.getByText("Email field is required")).toBeInTheDocument();
    expect(screen.getByText("Email confirmation field is required")).toBeInTheDocument();
    expect(screen.getByText("Password field is required")).toBeInTheDocument();
    expect(screen.getByText("Password confirmation field is required")).toBeInTheDocument();
  });

  it("It should not sign in if email and email confirmation fields are different", async () => {
    const password: string = "Aa693341480++--";

    act(() => {
      fireEvent.change(emailInput, { target: { value: "test@test.cl" } });
      fireEvent.change(emailConfirmationInput, { target: { value: "test" } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.change(passwordConfirmationInput, { target: { value: password } });
    });
    expect(emailInput.value).toEqual("test@test.cl");
    expect(emailConfirmationInput.value).toEqual("test");
    expect(passwordInput.value).toEqual(password);
    expect(passwordConfirmationInput.value).toEqual(password);
    
    const registerButton = screen.getByText<HTMLButtonElement>('Register');
    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(screen.getByText("Email confirmation and Email fields are different")).toBeInTheDocument();
  });

  it("It should not sign in if password field is filled and password confirmation is not", async () => {
    const email: string = "test@test.cl";

    act(() => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(emailConfirmationInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: "Aa693341480++--" } });
      fireEvent.change(passwordConfirmationInput, { target: { value: "" } });
    });
    expect(emailInput.value).toEqual(email);
    expect(emailConfirmationInput.value).toEqual(email);
    expect(passwordInput.value).toEqual("Aa693341480++--");
    expect(passwordConfirmationInput.value).toEqual("");
    
    const registerButton = screen.getByText<HTMLButtonElement>('Register');
    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(screen.getByText("Password confirmation and password fields are different")).toBeInTheDocument();
  });

  it("It should not sign in if password and password confirmation fields are different", async () => {
    const email: string = "test@test.cl";

    act(() => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(emailConfirmationInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: "Aa693341480++--" } });
      fireEvent.change(passwordConfirmationInput, { target: { value: "" } });
    });
    expect(emailInput.value).toEqual(email);
    expect(emailConfirmationInput.value).toEqual(email);
    expect(passwordInput.value).toEqual("Aa693341480++--");
    expect(passwordConfirmationInput.value).toEqual("");
    
    const registerButton = screen.getByText<HTMLButtonElement>('Register');
    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(screen.getByText("Password confirmation and password fields are different")).toBeInTheDocument();
  });
});