import { useState, useEffect } from "react";

export function useGetResults(searchQuery) {
  const [results, setResults] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function getResults() {
        if (searchQuery.length < 4) return;
        setLoadingList(true);
        const API_KEY = `http://www.omdbapi.com/?s=${searchQuery}&apikey=1f7ae04f`;
        try {
          const resp = await fetch(API_KEY, { signal: controller.signal });
          const data = await resp.json();
          if (data.Response === "False") {
            throw new Error("🔍 Couldn't find the film");
          } else {
            setError("");
            setResults(data.Search);
          }
        } catch (err) {
          if (err.name === "AbortError") return;
          setError(err.message);
        }
        setLoadingList(false);
      }
      getResults();
      return () => {
        controller.abort();
      };
    },
    [searchQuery]
  );
  return { results, loadingList, error };
}
