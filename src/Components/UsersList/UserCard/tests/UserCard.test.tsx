import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import UserCard from "../UserCard";
import { LOGIN, VIEW_PROFILE_BUTTON_TEXT } from "../../../../Constants";
import { User } from "../../../../types/user";

describe("UserCard", () => {
  const mockUser: User = {
    id: 123,
    login: "hatem",
    avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
  };

  const handleToggleSelect = jest.fn();

  test("renders user info and button", () => {
    render(
      <UserCard
        user={mockUser}
        handleToggleSelect={handleToggleSelect}
        isSelected={false}
        isEditMode={false}
      />
    );

    expect(screen.getByText(`ID: ${mockUser.id}`)).toBeInTheDocument();
    expect(screen.getByText(`${LOGIN}: ${mockUser.login}`)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: VIEW_PROFILE_BUTTON_TEXT })
    ).toBeInTheDocument();
    expect(screen.getByAltText("Avatar")).toHaveAttribute(
      "src",
      mockUser.avatar_url
    );
  });

  test("shows checkbox in edit mode and triggers handleToggleSelect", () => {
    render(
      <UserCard
        user={mockUser}
        handleToggleSelect={handleToggleSelect}
        isSelected={true}
        isEditMode={true}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(handleToggleSelect).toHaveBeenCalledTimes(1);
  });

  test("matches snapshot", () => {
    const { container } = render(
      <UserCard
        user={mockUser}
        handleToggleSelect={handleToggleSelect}
        isSelected={true}
        isEditMode={true}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
