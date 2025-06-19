import { useMemo, useState } from "react";
import { getUsers } from "../../api/usersApi";
import { debounce } from "../../utils/debounce";
import {
  EMPTY_SEARCH_QUERY_ERROR,
  RATE_LIMIT,
  RATE_LIMIT_ERROR_MESSAGE,
} from "../../Constants";
import { User } from "../../types/user";

export const useUsersList = () => {
  const [githubUsers, setGithubUsers] = useState<User[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(EMPTY_SEARCH_QUERY_ERROR);

  const fetchUsers = async (query: string) => {
    if (!query.trim()) {
      // If the search query is empty, reset the users list without making an API call
      setGithubUsers([]);
      setError(EMPTY_SEARCH_QUERY_ERROR);
      return;
    }
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      const data = await getUsers(query);
      setGithubUsers(data.items || []);
    } catch (err) {
      const message = (err as Error).message;
      if (message.includes(RATE_LIMIT)) {
        setError(RATE_LIMIT_ERROR_MESSAGE);
        setGithubUsers([]); // Clear users on rate limit error
      } else setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const debouncedFetchUsers = useMemo(() => debounce(fetchUsers, 300), []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedFetchUsers(e.target.value); // Debounce the search function
    // fetchUsers(e.target.value);
    setSelectedItems([]); // Reset selected items on new search
  };
  const handleToggleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItems(
      selectedItems.includes(e.target.value)
        ? selectedItems.filter((item) => item !== e.target.value)
        : [...selectedItems, e.target.value]
    );
  };

  const handleSelectAllUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(githubUsers.map((user) => user.id.toString()));
    } else {
      setSelectedItems([]); // Clear selection if unchecked
    }
  };
  const handleDeleteUsers = () => {
    setGithubUsers(
      githubUsers.filter((user) => !selectedItems.includes(user.id.toString()))
    );
    setSelectedItems([]); // Reset selected items after deletion
  };
  const handleDuplicateUsers = () => {
    const duplicatedUsers = githubUsers
      .filter((user) => selectedItems.includes(user.id.toString()))
      .map((user) => ({
        ...user,
        id: Math.random(),
      }));
    setGithubUsers([...duplicatedUsers, ...githubUsers]);
    //   setSelectedItems([]); // Reset selected items after duplication
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
    setSelectedItems([]); // Reset selected items when toggling edit mode
  };

  return {
    githubUsers,
    searchQuery,
    editMode,
    selectedItems,
    error,
    loading,
    handlers: {
      handleSearch,
      handleToggleSelect,
      handleDeleteUsers,
      handleDuplicateUsers,
      handleSelectAllUsers,
      handleEditMode,
    },
  };
};
