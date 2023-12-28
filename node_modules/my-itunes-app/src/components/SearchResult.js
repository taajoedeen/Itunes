import React from "react";

const SearchResult = ({ results, onAddFavorite }) => {
  return (
    <ul>
      {results.map((result, index) => (
        <li key={`${index}-${result.trackId || result.collectionId}`}>
          {/* Display relevant information based on the keys */}
          <div>
            <strong>Name:</strong> {result.trackName || result.collectionName}
          </div>
          <div>
            <strong>Artist:</strong> {result.artistName}
          </div>
          {/* Add more details as needed */}
          <button onClick={() => onAddFavorite(result)}>
            Add to Favorites
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchResult;
