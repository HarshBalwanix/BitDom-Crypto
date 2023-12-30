import "./App.css";
import { Route, Routes } from "react-router-dom";
import Exchanges from "./components/Exchanges";
import Coins from "./components/Coins";
import CoinDetails from "./components/CoinDetails";
import JoinUs from "./components/JoinUs";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Exchanges />} />
      <Route path="/coins" element={<Coins />} />
      <Route path="/coindetail/:id" element={<CoinDetails />} />
      <Route path="/join" element={<JoinUs />} />
    </Routes>
  );
}

export default App;
