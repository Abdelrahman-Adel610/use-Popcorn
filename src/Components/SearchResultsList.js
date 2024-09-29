import { GenenricPreviewItem } from "./GenenricPreviewItem";
import { GenericList } from "./GenericList";

export function SearchResultsList({ tempMovieData }) {
  return <GenericList data={tempMovieData} List={RenderList} />;
}
function RenderList({ data }) {
  return (
    <ul className="list list-movies">
      {data.map((el) => (
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
