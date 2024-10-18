import { useState, useEffect } from "react";
import { GenericList } from "./GenericList";
import Stars from "./Stars";

export function ViewFilm({ onClose, selectedId }) {
  const [loading, setLoading] = useState(true);
  const [film, setFilm] = useState(null);
  const [error, setError] = useState("");
  useEffect(
    function () {
      if (!selectedId) return;
      async function getFilm() {
        try {
          setLoading(true);
          const resp = await fetch(
            `http://www.omdbapi.com/?i=${selectedId}&apikey=1f7ae04f`
          );
          const film = await resp.json();
          setFilm(film);
          setError("");
        } catch (err) {
          setError("❌ Unable to get the film data");
        }
        setLoading(false);
      }
      getFilm();
    },
    [selectedId]
  );
  return (
    <GenericList>
      {error ? (
        error
      ) : loading ? (
        <p className="loader">Loading...</p>
      ) : (
        <div className="details">
          <button className="btn-back" onClick={onClose}>
            &larr;
          </button>
          <header>
            <img src={film.Poster} alt={film.Title} />
            <span className="details-overview">
              <h2>{film.Title}</h2>
              <p>
                {film.Released} . {film.Runtime}
              </p>
              <p>{film.Genre}</p>
              <p>⭐ {film.imdbRating} IMDB rating</p>
            </span>
          </header>
          <section>
            <div className="rating">
              <Stars size={25} defaultRating={0} />
            </div>
            <span>{film.Plot}</span>
            <span>{film.Actors}</span>
            <span>Directed by {film.Director}</span>
          </section>
        </div>
      )}
    </GenericList>
  );
}
