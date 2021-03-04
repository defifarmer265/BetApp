import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Router, Route, Switch} from 'react-router-dom'
import {addLocalStorage, fetchBets, fetchMatches, fetchLeagues} from '../store/actions'
import '../assets/css/app.scss'
import Header from './Header'
import Leagues from './Leagues'
import BetInfo from './BetInfo'
import MainView from '../pages'
import League from '../pages/League'
import Footer from './Footer'
import MobileBets from './MobileBets'
import {refreshToken} from '../store/actions/auth'
import history from '../history'
import {ReactComponent as LoadIcon} from '../assets/icons/money-bag.svg'

const App = props => {
  useEffect(() => {
    initApp()
  }, [])
  async function initApp() {
    const selectedMatches = localStorage.getItem('selectedMatches')
    if (selectedMatches) {
      props.addLocalStorage(JSON.parse(selectedMatches))
    }
    await props.fetchMatches('soccer_france_ligue_one')
    await props.refreshToken()
    if (props.authUser) {
      await props.fetchBets(props.authUser.localId)
    }
    await props.fetchLeagues()
  }
  return (
    <div className="app">
      <Router history={history}>
        {props.appLoaded ? (
          <>
            <Header />
            <main className="main-content">
              <div className="main-content__left">
                <Leagues
                  leagueClicked={() => {
                    return
                  }}
                />
              </div>
              <div className="main-content__center">
                <Switch>
                  <Route path="/" exact component={MainView} />
                  <Route path="/league/:league" exact component={League} />
                </Switch>
              </div>
              <div className="main-content__right">
                <BetInfo />
              </div>
            </main>
            <Footer />
          </>
        ) : (
          <div className="loadScreen">
            <LoadIcon />
          </div>
        )}
      </Router>
      <MobileBets />
    </div>
  )
}

const mapStateToProps = state => {
  return {authUser: state.authUser, appLoaded: state.appLoaded, leagues: state.leagues}
}
export default connect(mapStateToProps, {refreshToken, fetchBets, addLocalStorage, fetchMatches, fetchLeagues})(App)
