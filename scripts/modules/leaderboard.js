// leaderboard.js - fetch and render leaderboard
// TODO: implement fetch + render + filter + sort

export async function loadLeaderboard() {
  const response = await fetch('../assets/data/leaderboard.json');
  return await response.json();
}
