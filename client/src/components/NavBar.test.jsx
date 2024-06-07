import { render, screen } from "@testing-library/react";
import NavBar from "./Navbar";
import { MemoryRouter } from "react-router-dom";

describe("Navbar component", () => {
  test("Renders both links", () => {
    const renderNavBar = () => {
      render(<NavBar />, { wrapper: MemoryRouter });
    };
    // render the navbar.
    renderNavBar();

    // Expect the link to be there.
    expect(screen.getByText("Post list")).toBeInTheDocument();
    expect(screen.getByText("New post")).toBeInTheDocument();
  });
});
