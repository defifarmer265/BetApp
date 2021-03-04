export const fetchLeagues = (leagues = [], action) => {
  if (action.type === 'FETCH_LEAGUES') {
    return action.payload
  }
  return leagues
}

export const fetchLeagueMatches = (leagueMatches = [], action) => {
  if (action.type === 'FETCH_LEAGUE_MATCHES') {
    return action.payload
  }
  return leagueMatches
}

export const leagueMatchesFetched = (leagueMatches = false, action) => {
  if (action.type === 'LEAGUES_MATCHES_FETCHED') {
    // console.log("yepa" +action.payload)
    return action.payload
  }
  return leagueMatches
}
