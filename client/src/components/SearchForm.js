import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [term, setTerm] = useState("");
  const [mediaType, setMediaType] = useState("all");

  // List of available media types from iTunes Search API documentation
  const mediaTypes = [
    "all",
    "movie",
    "podcast",
    "music",
    "musicVideo",
    "audiobook",
    "shortFilm",
    "tvShow",
    "software",
    "ebook",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term, mediaType);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search:
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </label>
      <label>
        Media Type:
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
        >
          {mediaTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
