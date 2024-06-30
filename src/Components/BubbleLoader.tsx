import { useProgress } from "@react-three/drei";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";

const dataInterpolation = (p: number) => `Loading ${p.toFixed(2)}%`;

export const BubbleLoader = () => {
  const { active, progress } = useProgress();
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const progressSpanRef = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let t: number;
    if (active !== shown) t = setTimeout(() => setShown(active), 300);
    return () => clearTimeout(t);
  }, [shown, active]);

  const updateProgress = useCallback(() => {
    if (!progressSpanRef.current) return;
    progressRef.current += (progress - progressRef.current) / 2;
    if (progressRef.current > 0.95 * progress || progress === 100)
      progressRef.current = progress;
    progressSpanRef.current.innerText = dataInterpolation(progressRef.current);
    if (progressRef.current < progress)
      rafRef.current = requestAnimationFrame(updateProgress);
  }, [dataInterpolation, progress]);

  useEffect(() => {
    updateProgress();
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateProgress]);

  return shown ? (
    <>
      <div style={{ ...styles.container, opacity: active ? 1 : 0 }}>
        <div className="bubble-container">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
        <div>
          <div style={{ ...styles.inner }}>
            <div
              style={{ ...styles.bar, transform: `scaleX(${progress / 100})` }}
            ></div>
            <span ref={progressSpanRef} style={{ ...styles.data }} />
          </div>
        </div>
      </div>
    </>
  ) : null;
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#3b6478",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 300ms ease",
    zIndex: 1000,
  },
  inner: {
    width: 100,
    height: 3,
    background: "#272727",
    textAlign: "center",
  },
  bar: {
    height: 3,
    width: "100%",
    background: "white",
    transition: "transform 200ms",
    transformOrigin: "left center",
  },
  data: {
    display: "inline-block",
    position: "relative",
    fontVariantNumeric: "tabular-nums",
    marginTop: "0.8em",
    color: "#f0f0f0",
    fontSize: "0.6em",
    fontFamily: `-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Helvetica Neue", Helvetica, Arial, Roboto, Ubuntu, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    whiteSpace: "nowrap",
  },
};
