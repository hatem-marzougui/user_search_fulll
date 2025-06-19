import { render, screen } from "@testing-library/react";
import UsersList from "../UsersList";

jest.mock("../UsersListHook", () => ({
  useUsersList: () => ({
    githubUsers: [
      {
        id: "1",
        login: "hatem",
        avatar_url: "https://example.com/avatar.jpg",
      },
    ],
    editMode: false,
    searchQuery: "",
    selectedItems: [],
    error: null,
    loading: false,
    handlers: {
      handleSearch: jest.fn(),
      handleDuplicateUsers: jest.fn(),
      handleDeleteUsers: jest.fn(),
      handleEditMode: jest.fn(),
      handleToggleSelect: jest.fn(),
      handleSelectAllUsers: jest.fn(),
    },
  }),
}));

describe("UsersList", () => {
  test("renders UserCard when githubUsers is not empty", () => {
    render(<UsersList />);
    expect(screen.getByText(/hatem/i)).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { container } = render(<UsersList />);
    expect(container).toMatchSnapshot();
  });
});
