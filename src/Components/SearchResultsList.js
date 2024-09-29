import { useState } from "react";
import { GenenricPreviewItem } from "./GenenricPreviewItem";

export function SearchResultsList({ tempMovieData }) {
  const [isOpen, setState] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setState((s) => !s)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && (
        <ul className="list list-movies">
          {tempMovieData.map((el) => (
            <WatchedItem film={el} key={el.imdbID} />
          ))}
        </ul>
      )}
    </div>
  );
}
function WatchedItem({ film }) {
  return (
    <GenenricPreviewItem film={film}>
      <p>🗓️ {film.Year}</p>
    </GenenricPreviewItem>
  );
}
