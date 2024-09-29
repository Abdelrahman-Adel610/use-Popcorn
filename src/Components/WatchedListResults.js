import { GenenricPreviewItem } from "./GenenricPreviewItem";
import { GenericList } from "./GenericList";

export function WatchedListResults({ tempWatchedData }) {
  return (
    <GenericList>
      <RenderList filmList={tempWatchedData} />
    </GenericList>
  );
}
function RenderList({ filmList }) {
  return (
    <>
      <Summary filmList={filmList} />
      <ul className="list list-watched ">
        {filmList.map((el) => (
          <WatchedItem film={el} key={el.imdbID} />
        ))}
      </ul>
    </>
  );
}
function Summary({ filmList }) {
  function averagre(key) {
    return (
      filmList.reduce((acc, el) => acc + +el[`${key}`], 0) / filmList.length
    );
  }

  return (
    <div className="summary">
      <h2>movies you watched</h2>
      <div>
        <p>#️⃣ {filmList.length} movies</p>
        <p>⭐ {averagre("imdbRating")} </p>
        <p>🌟 {averagre("userRating")} </p>
        <p>⏳ {averagre("runtime")} </p>
      </div>
      <div></div>
    </div>
  );
}
function WatchedItem({ film }) {
  return (
    <GenenricPreviewItem film={film}>
      <div>
        <p>⭐ {film.imdbRating}</p>
        <p>🌟 {film.userRating}</p>
        <p>⏳ {film.runtime}</p>
      </div>
    </GenenricPreviewItem>
  );
}
