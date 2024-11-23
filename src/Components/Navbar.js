import { useEffect, useRef } from "react";

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
  const searchElement = useRef(null);
  useEffect(
    function () {
      function callback(e) {
        if (
          e.code === "Enter" &&
          document.activeElement !== searchElement.current
        ) {
          searchElement.current.focus();
          setSearchQuery("");
        }
      }
      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [setSearchQuery]
  );
  return (
    <input
      className="search"
      placeholder="Search movies..."
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      ref={searchElement}
    />
  );
}
export function ResultsStats({ numberOfresults }) {
  return <div className="num-results">Found {numberOfresults} results</div>;
}
