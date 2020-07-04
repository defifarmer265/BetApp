import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import '../index.scss'
import '../css/app.scss'
import Header from './Header'
import Leagues from './Leagues'
import BetInfo from './BetInfo'
import MainView from './MainView'
import League from './League'
import axios from 'axios'
import history from '../history'


class App extends React.Component{
  componentDidMount(){
    // axios
  }
  render(){
    return(
    <div className="app">
      <Router history={history}>
      <Header />
        <main className="main-content">
          <div className="main-content__left">
            <Leagues />
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
      </Router>
      </div>
    )

}
}

export default App;