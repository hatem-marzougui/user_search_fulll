import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../Search";
import { SEARCH_PLACEHOLDER } from "../../../../Constants";

describe("Search component", () => {
  test("renders input with placeholder", () => {
    render(<Search value="" onSearchChange={() => {}} />);
    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
    expect(input).toBeInTheDocument();
  });

  test("calls onSearchChange on typing", () => {
    const handleSearchChange = jest.fn();
    render(<Search value="" onSearchChange={handleSearchChange} />);
    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleSearchChange).toHaveBeenCalledTimes(1);
  });

  test("matches snapshot", () => {
    const { container } = render(<Search value="" onSearchChange={() => {}} />);
    expect(container).toMatchSnapshot();
  });
});
