import "./App.css";

import CanvasWrapper from "./Scene/Scene";

const App = () => {
  return (
    <>
      <CanvasWrapper />
      <div className="absolute inset-0 grid grid-cols-4 transition-opacity duration-1000 content-center pointer-events-none">
        <h1
          className="flex flex-col items-end uppercase font-bold text-[9rem] leading-tight col-start-3"
          style={{
            WebkitTextStroke: "2px #e5faff",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span>save</span>
          <span>the</span>
          <span
            className="tracking-wide"
            style={{
              WebkitTextFillColor: "#e5faff",
            }}
          >
            deep
          </span>
        </h1>
      </div>
    </>
  );
};

export default App;
