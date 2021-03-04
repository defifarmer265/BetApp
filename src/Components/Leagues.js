import React from 'react'
import '../assets/css/leagues.scss'
import {ReactComponent as Star} from '../assets/icons/star.svg'
import {fetchLeagues} from '../store/actions'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import ListLoader from './Loaders/ListLoader'

const Leagues = props => {
  const appendClass = id => {
    document.querySelector(`#${id}`).classList.add('selected')
  }
  const renderLeagues = () => {
    return props.leagues.map(league => (
      <li className="list-group-item" key={league.key}>
        <NavLink
          className="league-link"
          activeStyle={{
            fontWeight: '700'
          }}
          onClick={() => props.leagueClicked()}
          to={`/league/${league.key}`}
        >
          {league.title}
        </NavLink>
        <div onClick={() => appendClass(league.key)} id={league.key} className="league-star ">
          <Star />
        </div>
      </li>
    ))
  }
  return (
    <div className="leagues">
      <ul className="uk-list uk-list-divider list-group">
        {props.leagues.length > 0 ? (
          renderLeagues()
        ) : (
          <div className="loaders">
            {new Array(27).fill(null).map((e, index) => (
              <ListLoader key={index} />
            ))}
          </div>
        )}
      </ul>
    </div>
  )
}
const mapStateToProps = state => {
  return {leagues: state.leagues}
}
export default connect(mapStateToProps, {fetchLeagues})(Leagues)
