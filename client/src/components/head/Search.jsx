import React, { useState } from "react";

const Search = ({ userId, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(userId || "");
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search employee..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
