import styles from "./Problem.module.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";

interface Problem {
  description: string;
  id: number;
  testCases: [];
  title: string;
}

const Problem = () => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function getProblem() {
      await fetch(`http://localhost:3002/problem/${id}`)
        .then((res: any) => res.json())
        .then((response) => setProblem(response));
    }
    getProblem();
  }, []);

  const submitProblem = async () => {
    var payload = { userId: 1, questionId: 1, code };
    await fetch(`http://localhost:3002/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    })
      .then((res: any) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <button>
            <Link to="/problems">All Problems</Link>
          </button>
          {/* <button>Run</button> */}
          <button className={styles.submit} onClick={submitProblem}>
            Submit
          </button>
        </div>
        <div className={styles.problem}>
          <div className={styles.description}>
            <h3>Description</h3>
            <h4>{problem?.title}</h4>
            <p>{problem?.description}</p>
          </div>
          <div>
            <div className={styles.code}>
              <h3>Code</h3>
              <textarea
                placeholder="Enter your solution here"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></textarea>
            </div>
            <div className={styles.test}>
              <h3>Testcase</h3>
              <p>
                {problem?.testCases.map(
                  (tc: { input: string; output: string }) => (
                    <span key={tc.input}>
                      <p>{tc?.input}</p>
                      <p>{tc?.output}</p>
                    </span>
                  )
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Problem;
