import { GenenricPreviewItem } from "./GenenricPreviewItem";
import { GenericList } from "./GenericList";

export function SearchResultsList({ tempMovieData }) {
  return (
    <GenericList>
      <RenderList filmList={tempMovieData} />
    </GenericList>
  );
}
function RenderList({ filmList }) {
  return (
    <ul className="list list-movies">
      {filmList.map((el) => (
        <WatchedItem film={el} key={el.imdbID} />
      ))}
    </ul>
  );
}
function WatchedItem({ film }) {
  return (
    <GenenricPreviewItem film={film}>
      <p>🗓️ {film.Year}</p>
    </GenenricPreviewItem>
  );
}
