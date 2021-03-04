import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import '../assets/css/mainView.scss'
import {fetchLeagueMatches} from '../store/actions'
import BetGroup from '../Components/BetGroup'
import {ReactComponent as Refresh} from '../assets/icons/refresh.svg'
import {ReactComponent as LoadIcon} from '../assets/icons/money-bag.svg'

const MainView = props => {
  async function fetchLeagueMatches() {
    await props.fetchLeagueMatches(props.match.params.league)
  }

  useEffect(() => {
    fetchLeagueMatches()
  }, [props.match.params.league])
  return (
    <div className="league">
      {!props.matchesFetched ? (
        <div className="load-screen">
          <LoadIcon />
        </div>
      ) : (
        <div className="mainview">
          <div className="mainview__top">
            <div className="latest">
              <span className="circle"></span>
              <h2>Upcoming Matches</h2>
            </div>
            <div className="refresh">
              <span>Refresh</span>
              <Refresh />
            </div>
          </div>
          {props.matches.length > 0 ? (
            <div className="mainview__matches">
              <BetGroup matches={props.matches} />
            </div>
          ) : (
            <p style={{textAlign: 'center'}}>No matches</p>
          )}
        </div>
      )}
    </div>
  )
}

//this guy would merge the redux state to the component's prop
const mapStateToProps = state => {
  // console.log("moprps", state.posts)
  return {
    matches: state.selectedLeagueMatches,
    matchesFetched: state.leagueMatchesFetched
  }
}
//so by passing the action creator to the connet method, anytime the method is called, the action gets dispatched
//automatically
export default connect(mapStateToProps, {fetchLeagueMatches})(MainView)
