export function Navbar({ children }) {
  return (
    <div className="nav-bar">
      <Logo />
      {children}
    </div>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span>🍿 </span> <h1>usePopcorn</h1>
    </div>
  );
}
export function Search({ searchQuery, setSearchQuery }) {
  return (
    <input
      className="search"
      placeholder="Search movies..."
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
export function ResultsStats({ numberOfresults }) {
  return <div className="num-results">Found {numberOfresults} results</div>;
}
