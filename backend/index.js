import express from "express";
import jwt from "jsonwebtoken";
import { auth } from "./auth.js";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

const PORT = 3002;

const USERS = [
  {
    id: 1,
    username: "jishnu1rks",
    email: "jishnu",
    password: "123456",
  },
];

const PROBLEMS = [
  {
    id: 1,
    title: "What is the sum?",
    description:
      "Find the sum of the given input array of positive integer numbers",
    difficulty: "easy",
    acceptance: "50%",
    testCases: [
      {
        input: "[1,2,3,4,5]",
        output: "15",
      },
    ],
  },
];

const SUBMISSIONS = [
  {
    userId: "1",
    questionId: "1",
    code: "function sum() { return 18}",
    status: "rejected",
  },
];

app.post("/signup", (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send({
        message: "Please send all parameters. email, password, username",
      });
    }

    const usernameTaken = USERS.find((user) => user.username == username);

    if (usernameTaken) {
      return res.status(403).send({ message: "Username already taken" });
    }

    const isExists = USERS.find((user) => user.email == email);

    if (isExists) {
      return res.status(403).send({ message: "Email already registered" });
    }

    const newUser = {
      email,
      password,
      username,
    };

    USERS.push(newUser);

    res.status(201).send({ message: "User account is created successfully" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

app.post("/signin", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Please send all parametrs. username, password" });
    }

    const isExists = USERS.find(
      (user) => user.username == username && user.password == password
    );

    if (!isExists) {
      return res.status(401).send({ message: "Please signup first" });
    }

    let token = jwt.sign({ id: isExists.id }, process.env.JWT_SECRET);
    console.log(token);
    // let token = "hwllo";

    res.status(200).send({ message: "User logged in successfully", token });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

app.get("/problems", (req, res) => {
  res.status(200).send(PROBLEMS);
});

app.get("/problem/:id", (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Missing parameters, id" });
    }

    const problem = PROBLEMS.find((problem) => problem.id == id);

    const filteredProblem = {
      title: problem.title,
      description: problem.description,
      testCases: problem.testCases,
      id: problem.id,
    };

    res.status(200).send(filteredProblem);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

app.get("/submissions", auth, (req, res) => {
  res.status(200).send(SUBMISSIONS);
});

app.post("/submissions", auth, (req, res) => {
  try {
    const { userId, questionId, code } = req.body;

    if (!userId || !questionId || !code) {
      return res
        .status(400)
        .send({ message: "Missing parameters, userId, questionId, code" });
    }
    let status = "rejected";

    if (Math.random * 10 > 5) {
      status = "accepted";
    }

    const newSubmission = {
      userId,
      questionId,
      code,
      status,
    };

    SUBMISSIONS.push(newSubmission);

    res.status(200).send({ message: "Answer submitted successfully" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

app.listen(PORT, () => console.log(`APP is running on ${PORT}`));
