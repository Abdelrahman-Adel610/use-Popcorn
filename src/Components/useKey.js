import { useEffect } from "react";

export function useKey(action, keyCode) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code === keyCode) action();
      }
      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [action, keyCode]
  );
}
