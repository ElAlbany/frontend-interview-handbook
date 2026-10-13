/**
 * Problem 78 — Traffic light (config-driven cycle)
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useEffect, useState } from "react";

const LIGHTS = [
  { color: "red", duration: 4000 },
  { color: "green", duration: 3000 },
  { color: "yellow", duration: 500 },
];

export default function TrafficLight() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % LIGHTS.length),
      LIGHTS[index].duration
    );
    return () => clearTimeout(timer);
  }, [index]); // reschedule after every transition

  return (
    <div style={{ background: "#222", padding: 12, borderRadius: 12, width: 60 }}>
      {LIGHTS.map((light, i) => (
        <div key={light.color}
             style={{ width: 40, height: 40, borderRadius: "50%", margin: 8,
                      background: i === index ? light.color : "#444" }} />
      ))}
    </div>
  );
}
