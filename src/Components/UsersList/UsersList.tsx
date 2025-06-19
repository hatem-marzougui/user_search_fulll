import "./UsersList.css";
import { useUsersList } from "./UsersListHook";
import UserCard from "./UserCard/UserCard";
import Search from "./Search/Search";
import { NO_RESULTS_FOUND } from "../../Constants";
import ListControls from "./ListControls/ListControls";

const UsersList = () => {
  const {
    githubUsers,
    editMode,
    searchQuery,
    selectedItems,
    error,
    loading,
    handlers,
  } = useUsersList();

  return (
    <>
      <Search onSearchChange={handlers.handleSearch} value={searchQuery} />

      <ListControls
        selectedItems={selectedItems}
        handleDuplicateUsers={handlers.handleDuplicateUsers}
        handleDeleteUsers={handlers.handleDeleteUsers}
        githubUsers={githubUsers}
        editMode={editMode}
        handleEditMode={handlers.handleEditMode}
      />
      <div className="users-list-container" data-testid="users-list">
        {!loading && (error || githubUsers.length === 0) && (
          <div className="message">{error ? `${error}` : NO_RESULTS_FOUND}</div>
        )}

        {githubUsers.length > 0 && editMode && (
          <input
            className="select-all-checkbox"
            type="checkbox"
            onChange={handlers.handleSelectAllUsers}
            checked={
              selectedItems.length === githubUsers.length &&
              githubUsers.length > 0
            }
          />
        )}
        {githubUsers.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            handleToggleSelect={handlers.handleToggleSelect}
            isSelected={selectedItems.includes(user.id.toString())}
            isEditMode={editMode}
          />
        ))}
      </div>
    </>
  );
};

export default UsersList;
