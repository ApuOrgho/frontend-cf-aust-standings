import React from "react";
import "../style.css";

export default function CfStandingsTable({
  standings,
  contestTitle,
  contestId,
  onDownload,
  downloading,
}) {
  //if (!standings.length) return null;
  const loaded = standings.length > 0;
  const fullStandingsUrl = `https://codeforces.com/contest/${contestId}/standings`;
  const isRated = /(Div\.\s*[12]|Educational)/i.test(contestTitle);
  const pointsLabel = isRated ? "Points" : "Problems Solved";

  return (
    <div className="standings-section">
      {/* Buttons OUTSIDE the wrapper box */}
      <div className="button-row-outside">
        <a
          href={fullStandingsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="action-button"
        >
          Full Standings
        </a>
        <button
          onClick={onDownload}
          className="action-button download"
          disabled={downloading}
        >
          {downloading ? "Downloading..." : "Download PNG"}
        </button>
      </div>

      {/* This gets captured in PNG */}
      <div className="standings-wrapper" id="standings-content">
        <h2 className="contest-title">
          {contestTitle || `Contest ID: ${contestId}`}
        </h2>

        <div className="standings-table-container">
          <table className="standings-table">
            <thead>
              <tr>
                <th>AUST Rank</th>
                <th>Handle</th>
                <th>Global Rank</th>
                <th>{pointsLabel}</th>
                <th>Penalty</th>
              </tr>
            </thead>
            <tbody>
              {standings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-standings">
                    🚫 No participants found for this contest.
                  </td>
                </tr>
              ) : (
                standings.map(
                  ({ aust_rank, handle, global_rank, points, penalty }) => (
                    <tr key={handle}>
                      <td>{aust_rank}</td>
                      <td>{handle}</td>
                      <td>{global_rank}</td>
                      <td>{points}</td>
                      <td>{penalty === null ? "-" : penalty}</td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
