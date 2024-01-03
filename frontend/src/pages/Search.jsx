import React, { useState } from "react";
import usePosts from "../hooks/usePosts";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [searchResults, setSearchResults] = useState([]);
  const { searchedPosting } = usePosts("public", searchTerm, searchType);

  const handleSearch = () => {
    setSearchResults(searchedPosting);
  };

  return (
    <div>
      <p>This is Search page</p>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="title">Title</option>
      </select>
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.length > 0 ? (
          searchResults.map((post, i) => (
            <article key={i}>
              <h3>title: {post.title}</h3>
              <p>user id: {post.user}</p>
              <h4>visibility: {post.postVisibility}</h4>
              <p>content: {post.content}</p>
              <p>posting time: {post.timestamp}</p>
            </article>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Search;
