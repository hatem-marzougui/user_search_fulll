import React from "react";
import { EDIT_MODE, ELEMENT_SELECTED } from "../../../Constants";
import "./ListControls.css";
import { User } from "../../../types/user";

type ListControlsProps = {
  selectedItems: string[];
  handleDuplicateUsers: () => void;
  handleDeleteUsers: () => void;
  githubUsers: User[];
  editMode: boolean;
  handleEditMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ListControls = ({
  selectedItems,
  handleDuplicateUsers,
  handleDeleteUsers,
  githubUsers,
  editMode,
  handleEditMode,
}: ListControlsProps) => {
  return (
    <div className="control-div">
      {selectedItems.length > 0 && (
        <>
          <div className="users-count">
            <img
              className="icon"
              src="/icons/list.svg"
              alt="liste"
              width={24}
              height={24}
            />
            <span>
              {selectedItems.length} {ELEMENT_SELECTED}
            </span>
          </div>

          <div className="controls-buttons">
            <>
              <button className="icon-button" onClick={handleDuplicateUsers}>
                <img
                  className="icon"
                  src="/icons/duplicate.svg"
                  alt="duplicate"
                />
              </button>
              <button className="icon-button" onClick={handleDeleteUsers}>
                <img className="icon" src="/icons/delete.svg" alt="delete" />
              </button>
            </>
          </div>
        </>
      )}
      {githubUsers.length > 0 && (
        <div className="edit-mode-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={editMode}
              onChange={handleEditMode}
            />
            <span className="slider round"></span>
          </label>
          <span>{EDIT_MODE} </span>
        </div>
      )}
    </div>
  );
};

export default ListControls;
