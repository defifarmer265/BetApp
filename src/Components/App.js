import React from 'react';
import {connect} from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import {addLocalStorage} from '../actions'
import '../index.scss'
import '../css/app.scss'
import Header from './Header'
import Leagues from './Leagues'
import BetInfo from './BetInfo'
import MainView from './MainView'
import League from './League'
import Footer from "./Footer";
import MobileBets from './MobileBets'
import {refreshToken} from '../actions/auth'
import { fetchBets, fetchMatches, fetchLeagues } from "../actions";
import history from '../history'
import {ReactComponent as LoadIcon} from '../icons/money-bag.svg' 


class App extends React.Component{
  async componentWillMount(){
    const selectedMatches = localStorage.getItem("selectedMatches")
    if(selectedMatches){
      this.props.addLocalStorage(JSON.parse(selectedMatches))
    }
    await this.props.fetchMatches('soccer_france_ligue_one')
    await this.props.refreshToken()
    if(this.props.authUser){
      await this.props.fetchBets(this.props.authUser.localId)
    }
    await this.props.fetchLeagues()
    
    
  }
  getEl(){
    console.log(document.querySelector('#modal-center'))
  }
  render(){
    return(
    <div className="app">
      <Router history={history}>
        {this.props.appLoaded ? (
          <>
            <Header />
        <main className="main-content">
          <div className="main-content__left">
            <Leagues leagueClicked={()=>{return}}/>
          </div>
          <div className="main-content__center">
            <Switch>
                <Route path="/" exact component={MainView}/>
                <Route path="/league/:league" exact component={League} />
                {/* <Route path="/stream/list" exact component={StreamList} /> */}
                {/* <Route path="/stream/edit/:id" exact component={StreamEdit} /> */}
                {/* <Route path="/stream/delete/:id" exact component={StreamDelete} /> */}
                {/* <Route path="/stream/:id" exact component={StreamShow} /> */}
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
}

const mapStateToProps = (state) => {
  return {authUser: state.authUser,
          appLoaded: state.appLoaded,
          leagues: state.leagues}
}
export default connect(mapStateToProps, {refreshToken, fetchBets, addLocalStorage, fetchMatches, fetchLeagues})(App)
