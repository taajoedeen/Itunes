const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/search/:term/:mediaType", async (req, res) => {
  try {
    const { term, mediaType } = req.params;

    // Check if the term and mediaType are provided
    if (!term.trim() || !mediaType.trim()) {
      throw new Error("Invalid search parameters");
    }

    // Update the API URL to include the country parameter
    const response = await axios.get(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        term
      )}&media=${mediaType}&country=US`
    );

    // Set appropriate headers for CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    // Send JSON response
    res.json(response.data);
  } catch (error) {
    console.error(error);

    // Set a default error message
    let errorMessage = "An error occurred during the search. Please try again.";

    // Customize error message based on specific cases
    if (error.message === "Invalid search parameters") {
      errorMessage = "Invalid search parameters. Please provide valid values.";
    } else if (error.response && error.response.data) {
      errorMessage = error.response.data;
    }

    // Send an appropriate status code and error message
    res.status(500).send(errorMessage);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
