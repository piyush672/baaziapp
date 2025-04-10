import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './screens/HomeScreen'
import BalanceScreen from './screens/BalanceScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/balance" element={<BalanceScreen />} />
      </Routes>
    </Router>
  )
}

export default App
