import { useRef, useState } from "react";
import pt from "prop-types";
const startsContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "3px",
};
Stars.propTypes = {
  num: pt.number,
  size: pt.number,
  defaultRating: pt.number,
  messages: pt.array,
  color: pt.string,
  setRateOut: pt.func,
};
export default function Stars({
  num = 10,
  size = 48,
  color = "#fcc419",
  defaultRating = 3,
  setRateOut = undefined,
  messages = [],
}) {
  const [rate, setRate] = useState(defaultRating);
  const [hoverRate, setHoverRate] = useState(0);
  const trials = useRef(0);
  return (
    <div style={startsContainerStyle}>
      {Array.from({ length: num }, (el, i) => (
        <Star
          key={i}
          full={hoverRate ? i + 1 <= hoverRate : i + 1 <= rate}
          onClickHandler={() => {
            setRate(i + 1);
            setRateOut && setRateOut(i + 1);
            trials.current++;
            console.log(trials.current);
          }}
          onEnter={() => setHoverRate(i + 1)}
          onLeave={() => setHoverRate(0)}
          size={size}
          color={color}
        />
      ))}
      <p style={{ color: color, fontSize: size / 1.5, marginLeft: "10px" }}>
        {messages.length === num
          ? messages[(hoverRate || rate) - 1]
          : hoverRate || rate || ""}
      </p>
    </div>
  );
}
function Star({ full, onClickHandler, onEnter, onLeave, size, color }) {
  return (
    <span
      style={{ width: `${size}px`, cursor: "pointer", height: `${size}px` }}
      role="button"
      onClick={onClickHandler}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
