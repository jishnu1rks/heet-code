import styles from "./SignUp.module.css";
import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Signup = () => {
  const [login, updateLogin] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      message: "",
    }
  );
  const navigate = useNavigate();
  const signup = async () => {
    if (login.password === login.confirmPassword) {
      await fetch("http://localhost:3002/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login.username,
          password: login.password,
          email: login.email,
        }),
      })
        .then((res: any) => {
          if (res.ok) {
            navigate("/");
          }
          return res.json();
        })
        .then((res: any) => {
          updateLogin({ message: res.message });
        })
        .catch((err) => console.log(err));
    } else {
      alert("password and confirm password are not the same.");
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>HeetCode</h2>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={login.username}
              onChange={(e) => updateLogin({ username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) => updateLogin({ password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={login.confirmPassword}
              onChange={(e) => updateLogin({ confirmPassword: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={login.email}
              onChange={(e) => updateLogin({ email: e.target.value })}
            />
            <button onClick={signup}>Sign Up</button>
            <p>{login.message}</p>
          </div>
          <p>
            Have an account? <Link to="/signin">Sign In</Link>
          </p>
          {/* Todo: Login with github, google  */}
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
