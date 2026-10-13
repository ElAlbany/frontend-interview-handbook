/**
 * Problem 76 — Form with validation
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useState } from "react";

export default function SignupForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Invalid email";
    if (values.password.length < 8) errs.password = "Min 8 characters";
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true); // -> send to server
  };

  if (submitted) return <p>Welcome aboard!</p>;
  return (
    <form onSubmit={submit} noValidate>
      <div>
        <input type="email" placeholder="Email" value={values.email}
               onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} />
        {errors.email && <p role="alert" style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <input type="password" placeholder="Password" value={values.password}
               onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))} />
        {errors.password && <p role="alert" style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <button>Sign up</button>
    </form>
  );
}
// Production note: React Hook Form + Zod — one schema for client and server.
