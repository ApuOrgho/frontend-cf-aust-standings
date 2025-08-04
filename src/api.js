const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

export async function fetchStandings(contestId) {
  const res = await fetch(`${API_BASE}/standings/${contestId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch standings");
  }
  return res.json();
}
