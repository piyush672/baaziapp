import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./screens/HomeScreen";
import BalanceScreen from "./screens/BalanceScreen";
import GamesScreen from "./screens/GamesScreen";
import SlotsScreen from "./screens/SlotsScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/balance" element={<BalanceScreen />} />
        <Route path="/games" element={<GamesScreen />} />
        <Route path="/games/slots" element={<SlotsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
