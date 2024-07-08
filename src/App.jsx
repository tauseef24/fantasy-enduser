import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Matches from "./pages/matches";
import TeamSelect from "./pages/teamselect";
import SportLanding from "./pages/SportLanding";
import MatchSummary from "./components/MatchSummary";
import PointsCalculation from "./pages/pointsCalculation";
import LeaderBoard from "./components/LeaderBoard";
import LandingPage from "./pages/LandingPage";
import FantasyInfo from "./pages/FantasyInfo";
import AboutSection from "./pages/AboutSection";
import ScoreCard from "./pages/ScoreCard";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<LandingPage />} />
              <Route path="/sports" element={<Home />} />
              <Route path="/:sportId/:leagueId" element={<Matches />} />
              <Route path="/teamselect/:matchId" element={<TeamSelect />} />
              <Route path="/:sportId" element={<SportLanding />} />
              <Route path="/matchsummary/:matchId" element={<MatchSummary />} />
              <Route
                path="view-contest/:matchId/:contestId"
                element={<LeaderBoard />}
              />
              <Route path="/scorecard/:matchId" element={<ScoreCard />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/aboutus" element={<AboutSection />} />
            <Route path="/howtoplay" element={<FantasyInfo />} />
            <Route path="/pointsinfo" element={<PointsCalculation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
