import { useState } from "react";

export function GenericList({ children }) {
  const [isOpen, setState] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setState((s) => !s)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
