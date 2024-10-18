import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Main } from "./Main";
import { SearchResultsList } from "./SearchResultsList";
import { WatchedListResults } from "./WatchedListResults";
import { ResultsStats, Search } from "./Navbar";
import { ViewFilm } from "./ViewFilm";

export default function App() {
  const tempWatchedData = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      runtime: 148,
      imdbRating: 8.8,
      userRating: 10,
    },
    {
      imdbID: "tt0088763",
      Title: "Back to the Future",
      Year: "1985",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      runtime: 116,
      imdbRating: 8.5,
      userRating: 9,
    },
  ];
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const [error, setError] = useState("");
  useEffect(
    function () {
      async function getResults() {
        if (searchQuery.length < 4) return;
        setLoadingList(true);
        const API_KEY = `http://www.omdbapi.com/?s=${searchQuery}&apikey=1f7ae04f`;
        try {
          const resp = await fetch(API_KEY);
          const data = await resp.json();
          if (data.Response === "False") {
            throw new Error("🔍 Couldn't find the film");
          } else {
            setError("");
            setResults(data.Search);
          }
        } catch (err) {
          setError(err.message);
        }
        setLoadingList(false);
      }
      getResults();
    },
    [searchQuery]
  );

  return (
    <>
      <Navbar>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ResultsStats numberOfresults={results.length} />
      </Navbar>
      <Main>
        <SearchResultsList
          tempMovieData={results}
          loadingState={loadingList}
          error={error}
          clickHandle={setSelectedFilmId}
        />

        {!selectedFilmId && (
          <WatchedListResults tempWatchedData={tempWatchedData} />
        )}
        {selectedFilmId && (
          <ViewFilm
            selectedId={selectedFilmId}
            onClose={() => setSelectedFilmId(null)}
          />
        )}
      </Main>
    </>
  );
}
