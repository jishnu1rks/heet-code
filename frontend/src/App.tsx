import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Problem from "./pages/Problem";

import { TokenProvider } from "./context/TokenContext.tsx";

function App() {
  return (
    <TokenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/problems" element={<Home />} />
          <Route path="/problem/:id" element={<Problem />} />
        </Routes>
      </Router>
    </TokenProvider>
  );
}

export default App;
