import React, {useState} from 'react'
import {connect} from 'react-redux'
import SelectedMatches from './SelectedMatches'
import Cashout from './Cashout'
import BookBet from './BookBet'
import '../assets/css/betInfo.scss'

const BetInfo = props => {
  const [currentComp, setCurrentComp] = useState('betslip')

  const checkCurrenturrentComp = comp => {
    return currentComp === comp ? 'active' : ''
  }
  const renderBody = () => {
    if (currentComp === 'betslip') {
      if (props.selectedMatches.length > 0) {
        return <SelectedMatches />
      }
      return <BookBet />
    }
    return <Cashout />
  }

  return (
    <div className="betinfo">
      <div className="betinfo__option">
        <div onClick={() => setCurrentComp('betslip')} className={`betinfo__option-betslip ${checkCurrenturrentComp('betslip')}`}>
          <div>BetSlip</div> <span className="circle">{props.selectedMatches.length}</span>
        </div>
        <div onClick={() => setCurrentComp('cashout')} className={`betinfo__option-cashout ${checkCurrenturrentComp('cashout')}`}>
          <div>Cashout</div> <span className="circle">{props.placedBets.length}</span>
        </div>
      </div>
      {renderBody()}
    </div>
  )
}
const mapStateToProps = state => {
  return {selectedMatches: state.selectedMatches, placedBets: state.placedBets}
}
export default connect(mapStateToProps, null)(BetInfo)
