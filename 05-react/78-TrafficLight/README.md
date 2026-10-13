# 78. Traffic light

**Frequency in interviews:** high

## The problem

Build a traffic light that cycles red → green → yellow on its own timing, driven by a **config array** rather than hardcoded ifs — each light's duration comes from the config and the effect reschedules per phase.

## Approach and explanation

Config-driven (a data array, not hardcoded ifs) — that's what interviewers want to see. The effect depends on `index` and reschedules each transition. A classic from real frontend loops.

## Solution

`TrafficLight.jsx`

```jsx
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
```

`TrafficLight.tsx`

```tsx
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
```
