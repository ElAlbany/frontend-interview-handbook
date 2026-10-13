/**
 * Problem 76 — Form with validation (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { FormEvent, useState } from "react";

interface FormValues {
  email: string;
  password: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

export default function SignupForm() {
  const [values, setValues] = useState<FormValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Invalid email";
    if (values.password.length < 8) errs.password = "Min 8 characters";
    return errs;
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
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
