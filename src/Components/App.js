import { useState } from "react";
import { Navbar } from "./Navbar";
import { Main } from "./Main";
import { SearchResultsList } from "./SearchResultsList";
import { WatchedListResults } from "./WatchedListResults";
import { ResultsStats, Search } from "./Navbar";
import { ViewFilm } from "./ViewFilm";
import { useGetResults } from "./useGetResults";
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const { results, loadingList, error } = useGetResults(searchQuery);
  const [watched, setWatched] = useLocalStorage([], "watched");
  function handleDeleteWatched(id) {
    const cpy = [...watched];
    cpy.splice(cpy.findIndex((i) => i.imdbID === id));
    setWatched(cpy);
  }

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
