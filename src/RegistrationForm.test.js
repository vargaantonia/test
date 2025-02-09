import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationForm from "./RegistrationForm";

describe("RegistrationForm", () => {
  test("Megjelenik az összes mező", () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/Név/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email cím/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Jelszó/i)).toBeInTheDocument();
    expect(screen.getByText(/Regisztráció/i)).toBeInTheDocument();
  });

  test("Hibás email formátum esetén hibaüzenet jelenik meg", () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Email cím/i), {
      target: { value: "invalidemail" },
    });
    fireEvent.click(screen.getByText(/Regisztráció/i));

    expect(screen.getByText(/Kérlek adj meg egy érvényes email címet!/i)).toBeInTheDocument();
  });

  test("Üres mezők esetén megfelelő hibaüzenetek jelennek meg", () => {
    render(<RegistrationForm />);

    fireEvent.click(screen.getByText(/Regisztráció/i));

    expect(screen.getByText(/A név mező kitöltése kötelező!/i)).toBeInTheDocument();
    expect(screen.getByText(/Az email cím mező kitöltése kötelező!/i)).toBeInTheDocument();
    expect(screen.getByText(/A jelszó mező kitöltése kötelező!/i)).toBeInTheDocument();
  });

  test("Jelszó túl rövid esetén hibaüzenet jelenik meg", () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Jelszó/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText(/Regisztráció/i));

    expect(screen.getByText(/A jelszónak legalább 6 karakterből kell állnia!/i)).toBeInTheDocument();
  });

  test("Hibátlan űrlap kitöltése után az adatok kiírása a konzolra történik", () => {
    console.log = jest.fn();

    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Név/i), {
      target: { value: "Teszt Elek" },
    });
    fireEvent.change(screen.getByLabelText(/Email cím/i), {
      target: { value: "teszt@domain.com" },
    });
    fireEvent.change(screen.getByLabelText(/Jelszó/i), {
      target: { value: "Jelszo123" },
    });

    fireEvent.click(screen.getByText(/Regisztráció/i));


    expect(console.log).toHaveBeenCalledWith({
      name: "Teszt Elek",
      email: "teszt@domain.com",
      password: "Jelszo123",
    });
  });
});