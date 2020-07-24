// import oddsApi from '../apis/the-odds-api'
import axios from 'axios'
import { convertObjectToArray } from "../utils/utils";
const KEY ='5e01d35719973ce040dc43662222215b'
const resolveAwayTeam=(match)=>{
    // if(match.teams[0] !== match.home_team){
    //     return match.teams[0]             
    // }
    // else if(match.teams[0] === match.home_team){
    //     return match.teams[1]
    // }
    return match.teams.filter(team => team !== match.home_team)[0]
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

export const fetchLeagues = ()=> async (dispatch, getState)=>{
    const response = await axios.get(`https://api.the-odds-api.com/v3/sports/?apiKey=${KEY}`)
    // console.log("Postsss", response.data)
    let leagues = response.data.data.filter(league=> league.group.includes('Soccer'))
    dispatch({
        type: "FETCH_LEAGUES",
        payload: leagues
    })
}

export const fetchBets = (userId)=> async (dispatch, getState)=>{
    const {data} = await axios.get(`https://betapp-54dbf.firebaseio.com/betlist/${userId}.json`)
    dispatch({
        type: "FETCH_BETS",
        payload: convertObjectToArray(data)
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
    // console.log(betDetails);
    
    return{
        type: "SELECT_MATCH",
        payload: betDetails
    }
}

export const removeMatch = (betDetails)=>{
    // console.log(betDetails);
    return{
        type: "REMOVE_MATCH",
        payload: betDetails
    }
}

export const addLocalStorage = (betDetails)=>{
    // console.log(betDetails);
    return{
        type: "ADD_LOCALSTORAGE",
        payload: betDetails
    }
}



export const checkMatch = (betDetails)=>{
    // console.log(betDetails);
    return{
        type: "CHECK_MATCH",
        payload: betDetails
    }
}
export const leagueMatchesFetch = (isFetched)=>{
    
    return{
        type: "LEAGUES_MATCHES_FETCHED",
        payload: isFetched
    }
}

export const clearSelectedMatches = ()=>{
    return{
        type: "REMOVE_MATCHES"
    }
}
// export const deactivateMatch = (match_id)=> async (dispatch, getState)=>{
//     // console.log("Postsss", response.data)
//     let leagues = response.data.data.filter(league=> league.group.includes('Soccer'))
//     dispatch({
//         type: "DEACTIVATE_MATCH",
//         payload: match_id
//     })
// }