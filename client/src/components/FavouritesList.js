// FavoritesList.js

import React from "react";

const FavoritesList = ({ favorites, onRemoveFavorite }) => {
  return (
    <ul>
      {favorites.map((favorite) => (
        <li key={favorite.trackId}>
          {/* Render your favorite content here */}
          {favorite.trackName}
          {/* Example: remove from favorites button */}
          <button onClick={() => onRemoveFavorite(favorite)}>
            Remove from Favorites
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FavoritesList;
