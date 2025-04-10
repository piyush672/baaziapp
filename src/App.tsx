// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomeScreen";
import BalanceScreen from "./screens/BalanceScreen";
import GamesScreen from "./screens/GamesScreen";
import Layout from "./layout";
import SlotsScreen from "./screens/SlotsScreen";
import KisanQuizScreen from "./screens/KisanQuizScreen";
import CashoutSuccessScreen from "./screens/CashoutSuccessScreen";
import MonsoonDetailScreen from "./screens/MonsoonDetailScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="balance" element={<BalanceScreen />} />
          <Route path="games" element={<GamesScreen />} />
        </Route>
        <Route path="/monsoon-detail" element={<MonsoonDetailScreen />} />
        <Route path="/games/slots" element={<SlotsScreen />} />
        <Route path="/games/kisan-quiz" element={<KisanQuizScreen />} />
        <Route path="/cashout-success" element={<CashoutSuccessScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
