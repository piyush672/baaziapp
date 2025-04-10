import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./screens/HomeScreen";
import BalanceScreen from "./screens/BalanceScreen";
import GamesScreen from "./screens/GamesScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/balance" element={<BalanceScreen />} />
        <Route path="/games" element={<GamesScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
