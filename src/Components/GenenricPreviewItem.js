export function GenenricPreviewItem({ film, children, clickHandle }) {
  return (
    <li onClick={() => clickHandle()}>
      <img src={film.Poster} alt={film.title} />
      <h3>{film.Title}</h3>
      {children}
    </li>
  );
}
