import React from 'react'
import {BulletList} from 'react-content-loader'
import '../css/leagues.scss'
import {ReactComponent as Star} from '../icons/star.svg'
import {fetchLeagues} from '../actions'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import ListLoader from './Loaders/ListLoader'

class Leagues extends React.Component {
  appendClass(id) {
    document.querySelector(`#${id}`).classList.add('paka')
  }
  renderLeagues() {
    return this.props.leagues.map(league => (
      <li className="list-group-item" key={league.key}>
        <NavLink
          className="league-link"
          activeStyle={{
            fontWeight: '700'
          }}
          onClick={() => this.props.leagueClicked()}
          to={`/league/${league.key}`}
        >
          {league.title}
        </NavLink>
        <div onClick={() => this.appendClass(league.key)} id={league.key} className="league-star">
          <Star />
        </div>
      </li>
    ))
  }
  render() {
    // console.log(this.props.leagues)
    return (
      <div className="leagues">
        <ul className="uk-list uk-list-divider list-group">
          {this.props.leagues.length > 0 ? (
            this.renderLeagues()
          ) : (
            <div className="loaders">
              {new Array(25).fill(null).map(e => (
                <ListLoader />
              ))}
            </div>
          )}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {leagues: state.leagues}
}
export default connect(mapStateToProps, {fetchLeagues})(Leagues)
