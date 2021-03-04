import React from 'react'
import {connect} from 'react-redux'
import '../assets/css/cashout.scss'
import {ReactComponent as Arrow} from '../assets/icons/arrow.svg'
import SingleBetMatch from './SingleBetMatch'
const Cashout = ({authUser, placedBets}) => {
  const renderBets = () => {
    if (placedBets.length > 0) {
      return placedBets.map(bet => (
        <div key={bet.betId} className="cashout__matches">
          <div className="cashout__state">
            <span>Multiple</span>{' '}
            <div className="status">
              <span>PENDING</span>
              <Arrow />
            </div>
          </div>
          <SingleBetMatch bet={bet} />
        </div>
      ))
    }
    return (
      <div className="no-bets">
        <span role="img" aria-label="no-bet">
          You havent placed any bet🤔
        </span>
      </div>
    )
  }
  return (
    <div className="cashout">
      {!authUser ? (
        <div className="no-bets">
          <span role="img" aria-label="zero-bet">
            No bets at the moment👌
          </span>
        </div>
      ) : (
        renderBets()
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    authUser: state.authUser,
    placedBets: state.placedBets
  }
}
export default connect(mapStateToProps, null)(Cashout)
