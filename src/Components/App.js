import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Main } from "./Main";
import { SearchResultsList } from "./SearchResultsList";
import { WatchedListResults } from "./WatchedListResults";
import { ResultsStats, Search } from "./Navbar";
import { ViewFilm } from "./ViewFilm";

export default function App() {
  const [results, setResults] = useState([]);
  const [watched, setWatched] = useState(() =>
    JSON.parse(localStorage.getItem("watched"))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const [error, setError] = useState("");
  function handleDeleteWatched(id) {
    const cpy = [...watched];
    cpy.splice(cpy.findIndex((i) => i.imdbID === id));
    setWatched(cpy);
  }
  useEffect(
    function () {
      const controller = new AbortController();
      async function getResults() {
        if (searchQuery.length < 4) return;
        setLoadingList(true);
        const API_KEY = `http://www.omdbapi.com/?s=${searchQuery}&apikey=1f7ae04f`;
        try {
          const resp = await fetch(API_KEY, { signal: controller.signal });
          const data = await resp.json();
          if (data.Response === "False") {
            throw new Error("🔍 Couldn't find the film");
          } else {
            setError("");
            setResults(data.Search);
          }
        } catch (err) {
          if (err.name === "AbortError") return;
          setError(err.message);
        }
        setLoadingList(false);
      }
      getResults();
      return () => {
        controller.abort();
      };
    },
    [searchQuery]
  );
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  function addTowatched(film) {
    setWatched((e) => [...e, film]);
  }
  function isInWatchedList(id) {
    return watched.find((el) => el.imdbID === id);
  }
  return (
    <>
      <Navbar>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={(e) => {
            setSearchQuery(e);
            setSelectedFilmId(null);
          }}
        />
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
          <WatchedListResults
            tempWatchedData={watched}
            updateList={handleDeleteWatched}
          />
        )}
        {selectedFilmId && (
          <ViewFilm
            selectedId={selectedFilmId}
            onClose={() => setSelectedFilmId(null)}
            addTowatched={addTowatched}
            isInWatchedList={isInWatchedList}
            key={selectedFilmId}
          />
        )}
      </Main>
    </>
  );
}
