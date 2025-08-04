import React, { useState, useEffect } from "react";
import axios from "axios";
import CF_AUST_HANDLES from "./handles/cf-aust-handles";
import CfStandingsTable from "./components/cf-standings-table";
import html2canvas from "html2canvas";
import "./style.css";

// Automatically detect local or production
const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

function App() {
  const [contestId, setContestId] = useState("");
  const [standings, setStandings] = useState([]);
  const [contestTitle, setContestTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [showStandings, setShowStandings] = useState(false); // <- NEW

  const fetchStandings = async () => {
    if (!contestId.trim()) return;

    setLoading(true);
    setError(null);
    setStandings([]);
    setShowStandings(false); // Hide before loading

    try {
      const res = await axios.get(`${API_BASE}/standings/${contestId.trim()}`);

      const filtered = res.data.global_standings.filter((user) =>
        CF_AUST_HANDLES.includes(user.handle)
      );

      filtered.sort((a, b) => a.rank - b.rank);

      const ranked = filtered.map((user, idx) => ({
        ...user,
        aust_rank: idx + 1,
        global_rank: user.rank,
      }));

      setStandings(ranked);
      setContestTitle(res.data.contest_name || "");
      setShowStandings(true); // Show only if successful
    } catch (err) {
      setError("Failed to fetch standings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Enter") fetchStandings();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [contestId]);

  const handleDownload = async () => {
    const element = document.getElementById("standings-content");
    if (!element) return;

    setDownloading(true);

    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `cf-standings-${contestId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div
        className="app-background"
        style={{ backgroundImage: 'url("/images/bg.jpeg")' }}
      ></div>
      <div className="app-container">
        <header className="top-header">
          <img
            src="/images/aust-logo.png"
            alt="AUST Logo"
            className="top-left-logo"
          />
          <img
            src="/images/cf-logo.png"
            alt="CF Logo"
            className="top-right-logo"
          />
        </header>
        <h1 className="main-title-box">
          <div className="title-line">Codeforces Contest Standings</div>
          <div className="title-subline">
            Ahsanullah University of Science & Technology
          </div>
          <div className="title-divider"></div>{" "}
        </h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter Valid Contest ID (e.g. 1234)"
            value={contestId}
            onChange={(e) => setContestId(e.target.value)}
            className="contest-input"
          />
          <button onClick={fetchStandings} className="load-button">
            Load
          </button>
        </div>

        {loading && <p className="loading-msg">Loading...</p>}
        {error && <p className="error-msg">{error}</p>}

        {showStandings && (
          <CfStandingsTable
            standings={standings}
            contestTitle={contestTitle}
            contestId={contestId}
            onDownload={handleDownload}
            downloading={downloading}
          />
        )}
      </div>
    </>
  );
}

export default App;
