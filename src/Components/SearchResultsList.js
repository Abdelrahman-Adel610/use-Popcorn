import { GenenricPreviewItem } from "./GenenricPreviewItem";
import { GenericList } from "./GenericList";

export function SearchResultsList({
  tempMovieData,
  loadingState,
  error,
  clickHandle,
}) {
  return (
    <GenericList>
      {error ? (
        <Error msg={error} />
      ) : loadingState ? (
        <Loader />
      ) : (
        <RenderList filmList={tempMovieData} clickHandle={clickHandle} />
      )}
    </GenericList>
  );
}
function RenderList({ filmList, clickHandle }) {
  return (
    <ul className="list list-movies">
      {filmList.map((el) => (
        <WatchedItem film={el} key={el.imdbID} clickHandle={clickHandle} />
      ))}
    </ul>
  );
}
function WatchedItem({ film, clickHandle }) {
  return (
    <GenenricPreviewItem
      film={film}
      clickHandle={() =>
        clickHandle((e) => {
          if (e === film.imdbID) {
            return null;
          } else return film.imdbID;
        })
      }
    >
      <p>🗓️ {film.Year}</p>
    </GenenricPreviewItem>
  );
}
function Loader() {
  return <p className="loader">Loading...</p>;
}
function Error({ msg }) {
  return <p className="error">{` ${msg}`}</p>;
}
