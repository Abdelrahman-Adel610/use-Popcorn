import { SearchResultsList } from "./SearchResultsList";
import { WatchedListResults } from "./WatchedListResults";

export function Main({ tempMovieData, tempWatchedData }) {
  return (
    <div className="main">
      <SearchResultsList tempMovieData={tempMovieData} />
      <WatchedListResults tempWatchedData={tempWatchedData} />
    </div>
  );
}
