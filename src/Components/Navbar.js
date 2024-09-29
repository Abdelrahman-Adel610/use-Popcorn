export function Navbar({ numberOfresults, searchQuery, setSearchQuery }) {
  return (
    <div className="nav-bar">
      <Logo />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ResultsStats numberOfresults={numberOfresults} />
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
function Search({ searchQuery, setSearchQuery }) {
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
function ResultsStats({ numberOfresults }) {
  return <div className="num-results">Found {numberOfresults} results</div>;
}
