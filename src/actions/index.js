// import oddsApi from '../apis/the-odds-api'
import axios from 'axios'
const KEY ='763eeecb845ff81a3c5cd63452bd47f9'
const resolveAwayTeam=(match)=>{
    if(match.teams[0] !== match.home_team){
        return match.teams[0]             
    }
    else if(match.teams[0] === match.home_team){
        return match.teams[1]
    }
}
export const fetchMatches = (league)=> async (dispatch, getState)=>{
    const response = await axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=${KEY}&region=uk&mkt=h2h&sport=${league}`)
    // console.log("Postsss", response.data)
    let matches = response.data.data
    for(let i=0; i<matches.length; i++){
        matches[i].match_id = matches[i].teams.join('').replace(/\s/g, '')
        matches[i].away_team = resolveAwayTeam(matches[i])
    }
    dispatch({
        type: "FETCH_MATCHES",
        payload: response.data.data
    })
    // console.log(getState(), "steter")
}

export const fetchLeagues = (league)=> async (dispatch, getState)=>{
    const response = await axios.get(`https://api.the-odds-api.com/v3/sports/?apiKey=${KEY}`)
    // console.log("Postsss", response.data)
    let leagues = response.data.data.filter(league=> league.group.includes('Soccer'))
    dispatch({
        type: "FETCH_LEAGUES",
        payload: leagues
    })
}

export const fetchLeagueMatches = (league)=> async (dispatch, getState)=>{
    dispatch({
        type: "LEAGUES_MATCHES_FETCHED",
        payload: false
    })
    const response = await axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=${KEY}&region=uk&mkt=h2h&sport=${league}`)
    // console.log("Postsss", response.data)
    let matches = response.data.data
    for(let i=0; i<matches.length; i++){
        matches[i].match_id = matches[i].teams.join('').replace(/\s/g, '')
        matches[i].away_team = resolveAwayTeam(matches[i])

    }
    dispatch({
        type: "FETCH_LEAGUE_MATCHES",
        payload: response.data.data
    })
    dispatch({
        type: "LEAGUES_MATCHES_FETCHED",
        payload: true
    })

    
    // console.log(getState(), "steter")
}

export const selectMatch = (betDetails)=>{
    return{
        type: "SELECT_MATCH",
        payload: betDetails
    }
}

export const leagueMatchesFetch = (isFetched)=>{
    console.log("lmaoooo");
    
    return{
        type: "LEAGUES_MATCHES_FETCHED",
        payload: isFetched
    }
}
