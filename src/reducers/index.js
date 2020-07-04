import {combineReducers} from 'redux'
import {fetchMatches, selectMatch} from './matchesReducers'
import {fetchLeagues, fetchLeagueMatches, leagueMatchesFetched} from './leaguesReducers'

export default combineReducers({
    //so posts is what will apper in components props
    matches: fetchMatches,
    selectedMatches: selectMatch,
    leagues: fetchLeagues,
    selectedLeagueMatches: fetchLeagueMatches,
    leagueMatchesFetched
})