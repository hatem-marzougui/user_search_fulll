import React from "react";
import "./Search.css";
import { SEARCH_PLACEHOLDER } from "../../../Constants";

type SearchProps = {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Search = ({ onSearchChange, value }: SearchProps) => {
  return (
    <div className="search-container">
      <input
        type="search"
        value={value}
        onChange={onSearchChange}
        placeholder={SEARCH_PLACEHOLDER}
        className="search-input"
      />
    </div>
  );
};

export default Search;
