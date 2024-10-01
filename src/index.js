import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./Components/App";
import Stars from "./Components/Stars";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Stars
      num={5}
      messages={["bad", "good", "med", "very good", "excellent"]}
      color="blue"
      size={32}
    />
  </React.StrictMode>
);
