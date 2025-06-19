import { render, screen, fireEvent } from "@testing-library/react";
import ListControls from "../ListControls";
import { EDIT_MODE, ELEMENT_SELECTED } from "../../../../Constants";

describe("ListControls simple test", () => {
  const mockDuplicate = jest.fn();
  const mockDelete = jest.fn();
  const mockSwitchEditMode = jest.fn();

  test("renders selected count and delete/duplicate buttons when items are selected", () => {
    render(
      <ListControls
        selectedItems={["1"]}
        handleDuplicateUsers={mockDuplicate}
        handleDeleteUsers={mockDelete}
        githubUsers={[{ id: 1, login: "user", avatar_url: "" }]}
        editMode={false}
        handleEditMode={mockSwitchEditMode}
      />
    );
    expect(screen.getByText(`1 ${ELEMENT_SELECTED}`)).toBeInTheDocument();
    fireEvent.click(screen.getByAltText("duplicate"));
    expect(mockDuplicate).toHaveBeenCalled();

    fireEvent.click(screen.getByAltText("delete"));
    expect(mockDelete).toHaveBeenCalled();
  });

  test("renders edit mode switcher", () => {
    render(
      <ListControls
        selectedItems={[]}
        handleDuplicateUsers={mockDuplicate}
        handleDeleteUsers={mockDelete}
        githubUsers={[{ id: 1, login: "user", avatar_url: "" }]}
        editMode={true}
        handleEditMode={mockSwitchEditMode}
      />
    );

    const switcher = screen.getByRole("checkbox");
    expect(switcher).toBeChecked();

    fireEvent.click(switcher);
    expect(mockSwitchEditMode).toHaveBeenCalled();
  });

  test("matches snapshot", () => {
    const { container } = render(
      <ListControls
        selectedItems={[]}
        handleDuplicateUsers={mockDuplicate}
        handleDeleteUsers={mockDelete}
        githubUsers={[{ id: 1, login: "user", avatar_url: "" }]}
        editMode={true}
        handleEditMode={mockSwitchEditMode}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
