import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "../Header";
import { HEADER_TITLE } from "../../../Constants";

describe("Header component", () => {
  test("renders header title correctly", () => {
    render(<Header />);
    const titleElement = screen.getByText(HEADER_TITLE);
    expect(titleElement).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
