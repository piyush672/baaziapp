// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomeScreen";
import BalanceScreen from "./screens/BalanceScreen";
import GamesScreen from "./screens/GamesScreen";
import Layout from "./layout";
import SlotsScreen from "./screens/SlotsScreen";
import KisanQuizScreen from "./screens/KisanQuizScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="balance" element={<BalanceScreen />} />
          <Route path="games" element={<GamesScreen />} />
        </Route>
        <Route path="/games/slots" element={<SlotsScreen />} />
        <Route path="/games/kisan-quiz" element={<KisanQuizScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
