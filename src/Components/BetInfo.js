import React from 'react'
import {connect} from 'react-redux'
import SelectedMatches from './SelectedMatches'
import Cashout from './Cashout'
import BookBet from './BookBet'
import '../css/betInfo.scss'

class BetInfo extends React.Component {
  state = {currentComp: 'betslip'}

  checkCurrenturrentComp(comp) {
    return this.state.currentComp === comp ? 'active' : ''
  }
  renderBody() {
    if (this.state.currentComp === 'betslip') {
      if (this.props.selectedMatches.length > 0) {
        return <SelectedMatches />
      }
      return <BookBet />
    }
    return <Cashout />
  }

  render() {
    return (
      <div className="betinfo">
        <div className="betinfo__option">
          <div onClick={() => this.setState({currentComp: 'betslip'})} className={`betinfo__option-betslip ${this.checkCurrenturrentComp('betslip')}`}>
            <div>BetSlip</div> <span className="circle">{this.props.selectedMatches.length}</span>
          </div>
          <div onClick={() => this.setState({currentComp: 'cashout'})} className={`betinfo__option-cashout ${this.checkCurrenturrentComp('cashout')}`}>
            <div>Cashout</div> <span className="circle">{this.props.placedBets.length}</span>
          </div>
        </div>
        {this.renderBody()}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {selectedMatches: state.selectedMatches, placedBets: state.placedBets}
}
export default connect(mapStateToProps, null)(BetInfo)
