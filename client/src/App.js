import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import FavoritesList from "./components/FavouritesList";
import axios from "axios";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (term, mediaType) => {
    try {
      if (!term.trim()) {
        console.warn("Empty search term. Please enter a valid search term.");
        return;
      }

      setLoading(true);

      // Updated mediaType to "all" for the API call
      const response = await axios.get(
        `http://localhost:5000/api/search/${term}/${mediaType}`
      );

      console.log("API Response:", response.data);

      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error during search:", error.response);
      setError("An error occurred during the search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = (favorite) => {
    const isDuplicate = favorites.some(
      (fav) =>
        (fav.trackId && fav.trackId === favorite.trackId) ||
        (fav.collectionId && fav.collectionId === favorite.collectionId)
    );

    if (!isDuplicate) {
      setFavorites([...favorites, favorite]);
    } else {
      console.warn("Item is already in favorites:", favorite);
    }
  };

  const handleRemoveFavorite = (favoriteToRemove) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.trackId !== favoriteToRemove.trackId
    );
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h1>iTunes Search App</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Search Results</h2>
      <SearchResult results={searchResults} onAddFavorite={handleAddFavorite} />
      <h2>Favorites</h2>
      <FavoritesList
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />
    </div>
  );
}

export default App;
