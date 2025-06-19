import { render, screen } from "@testing-library/react";
import App from "./App";
import { HEADER_TITLE, SEARCH_PLACEHOLDER } from "./Constants";

test("App must renders header", () => {
  render(<App />);
  const headerElement = screen.getByText(HEADER_TITLE);
  expect(headerElement).toBeInTheDocument();
});

test("App must renders search input", () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
  expect(searchInput).toBeInTheDocument();
});

test("App must renders users list", () => {
  render(<App />);
  const usersList = screen.getByTestId("users-list");
  expect(usersList).toBeInTheDocument();
});
test("matches snapshot", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
