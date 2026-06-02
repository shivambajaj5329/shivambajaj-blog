import { HashRouter, Route, Routes } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Today from "./pages/Today";
import Workout from "./pages/Workout";
import Nutrition from "./pages/Nutrition";
import Summary from "./pages/Summary";
import Plan from "./pages/Plan";
import Run from "./pages/Run";
import Metrics from "./pages/Metrics";
import Goals from "./pages/Goals";
import History from "./pages/History";
import Upload from "./pages/Upload";

export default function App() {
  return (
    <HashRouter>
      <main className="page">
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/workout/:dayId" element={<Workout />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/run" element={<Run />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/history" element={<History />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </main>
      <BottomNav />
    </HashRouter>
  );
}
