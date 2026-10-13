/**
 * Problem 78 — Traffic light (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { useEffect, useState } from "react";

interface Light {
  color: string;
  duration: number;
}

const LIGHTS: Light[] = [
  { color: "red", duration: 4000 },
  { color: "green", duration: 3000 },
  { color: "yellow", duration: 500 },
];

export default function TrafficLight() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setIndex((i) => (i + 1) % LIGHTS.length), LIGHTS[index].duration);
    return () => clearTimeout(timer);
  }, [index]);

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
