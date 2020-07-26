import {combineReducers} from 'redux'
import {fetchMatches, selectMatch} from './matchesReducers'
import {fetchLeagues, fetchLeagueMatches, leagueMatchesFetched} from './leaguesReducers'
import {authUser, betAmount, placedBets, appLoaded} from './userReducers'

export default combineReducers({
    //so posts is what will apper in components props
    matches: fetchMatches,
    selectedMatches: selectMatch,
    leagues: fetchLeagues,
    selectedLeagueMatches: fetchLeagueMatches,
    leagueMatchesFetched,
    authUser,
    betAmount,
    placedBets,
    appLoaded
})