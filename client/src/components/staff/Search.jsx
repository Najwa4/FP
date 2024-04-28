import React, { useState } from "react";

const Search = ({ applicantId, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(applicantId || "");
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
        placeholder="Search applicant..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
