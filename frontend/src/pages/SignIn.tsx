import styles from "./SignUp.module.css";
import { useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useToken } from "../context/TokenContext";
const SignIn = () => {
  const [login, updateLogin] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      username: "",
      password: "",
      message: "",
    }
  );
  const { handleToken } = useToken();
  const navigate = useNavigate();
  const signin = async () => {
    if (login.password && login.username) {
      await fetch("http://localhost:3002/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login.username,
          password: login.password,
        }),
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          updateLogin({ message: res.message });
          localStorage.setItem("token", res.token);
          handleToken(res.token);
          navigate("/problems");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please enter the username and password");
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
            <button onClick={signin}>Sign In</button>
          </div>
          <p>
            New to heetcode? <Link to="/signup">Sign Up</Link>
          </p>
          {/* Todo: Login with github, google  */}
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
