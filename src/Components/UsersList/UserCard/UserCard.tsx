import React from "react";
import "./UserCard.css";
import { LOGIN, VIEW_PROFILE_BUTTON_TEXT } from "../../../Constants";
import { User } from "../../../types/user";

type UserCardProps = {
  user: User;
  handleToggleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected: boolean;
  isEditMode: boolean;
};

const UserCard = ({
  user,
  handleToggleSelect,
  isSelected,
  isEditMode,
}: UserCardProps) => {
  return (
    <div className="user-card">
      {isEditMode && (
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleToggleSelect}
          value={user.id}
          checked={isSelected}
        />
      )}
      <img src={user.avatar_url} alt="Avatar" className="avatar" />
      <h6>ID: {user.id}</h6>
      <h6>
        {LOGIN}: {user.login}
      </h6>
      <button className="viewProfile_button">{VIEW_PROFILE_BUTTON_TEXT}</button>
    </div>
  );
};

export default UserCard;
