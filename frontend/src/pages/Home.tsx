import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

interface Problem {
  description: string;
  id: number;
  testCases: [];
  title: string;
  difficulty: string;
  acceptance: string;
}

const Home = () => {
  const [problems, setProblems] = useState<Problem[] | null>(null);
  const init = async () => {
    await fetch("http://localhost:3002/problems")
      .then((res: any) => res.json())
      .then((res: Problem[]) => setProblems(res));
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.problems}>
          <h2>Problems</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Solution</th>
                <th>Difficulty</th>
                <th>Acceptance Ratio</th>
              </tr>
            </thead>
            <tbody>
              {problems?.map((problem) => (
                <tr key={problem.id}>
                  <td>
                    <Link to={`/problem/${problem.id}`}>{problem.title}</Link>
                  </td>
                  <td></td>
                  <td>{problem?.difficulty}</td>
                  <td>{problem?.acceptance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
