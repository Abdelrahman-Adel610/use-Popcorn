export function GenenricPreviewItem({ film, children }) {
  return (
    <li>
      <img src={film.Poster} alt={film.title} />
      <h3>{film.Title}</h3>
      {children}
    </li>
  );
}
