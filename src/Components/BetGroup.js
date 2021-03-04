import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches} from '../store/actions'
import BetMatch from './BetMatch'
import '../assets/css/betGroup.scss'
const BetInfo = props => {
  const renderMatches = () => {
    let theDates = []
    props.matches.forEach(val => theDates.push(val.commence_time))
    let theUniques = []
    theUniques = [...new Set(theDates)]
    const els = []
    let previous = 0
    theUniques.forEach((el, index, arr) => {
      let formatedUnix = `${new Date(el * 1000).getMonth()}/${new Date(el * 1000).getDate()}`
      let date = new Date(el * 1000)
      if (previous !== formatedUnix) {
        els.push(
          <tr key={el}>
            <td colSpan="2" className="match_date">{`${date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate()}/${
              date.getMonth().toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth()
            }
            ${date.toLocaleString('default', {weekday: 'long'})}`}</td>
          </tr>
        )
      }
      props.matches
        .filter(match => match.commence_time === el)
        .forEach((match, index, arr) => {
          els.push(<BetMatch key={match.match_id} match={match} />)
        })
      previous = `${new Date(el * 1000).getMonth()}/${new Date(el * 1000).getDate()}`
    })
    return els
  }
  return (
    <div className="betGroup">
      <table className="">
        <thead>
          <tr>
            <th className=""></th>
            <th className="teams"></th>
            <th className="">Home</th>
            <th className="">Draw</th>
            <th className="">Away</th>
          </tr>
        </thead>
        <tbody>{renderMatches()}</tbody>
      </table>
    </div>
  )
}

// const mapStateToProps =(state)=>{
//     // console.log("moprps", state.posts)
//     return {matches: state.matches}
// }
export default connect(null, {fetchMatches})(BetInfo)
