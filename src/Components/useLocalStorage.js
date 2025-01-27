import { useState, useEffect } from "react";

export function useLocalStorage(initialValue, key) {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);
    return data?.length ? JSON.parse(data) : initialValue;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value]
  );
  return [value, setValue];
}
