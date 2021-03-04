import React, {useState} from 'react'
import {connect} from 'react-redux'
import Transition from 'react-transition-group/Transition'
import {ReactComponent as Arrow} from '../assets/icons/arrow.svg'
import '../assets/css/mobileBets.scss'
import SelectedMatches from './SelectedMatches'
import BookBet from './BookBet'
import Cashout from './Cashout'
const MobileBets = props => {
  const [isModalShowing, setIsModalShowing] = useState(false)
  const [currentComp, setCurrentComp] = useState('bets')
  const openModal = (comp, modalShow) => {
    setCurrentComp(comp)
    setIsModalShowing(modalShow)
  }
  const showBets = () => {
    if (currentComp === 'selectedMatches') {
      if (props.selectedMatches.length > 0) {
        return <SelectedMatches />
      } else {
        return <BookBet />
      }
    }
    return <Cashout />
  }

  const addAnimation = state => {
    if (state === 'entering') {
      return 'slide-up-enter'
    } else if (state === 'entered') {
      return 'slide-up-enter-active'
    } else if (state === 'exiting') {
      return 'slide-up-exit-active'
    }
  }
  return (
    <div className="mobilebets">
      <Transition in={isModalShowing} timeout={200} mountOnEnter unmountOnExit>
        {state => (
          <div className="mobilebets__content">
            <div className={`mobilebets__top ${addAnimation(state)}`}>
              <Arrow onClick={() => setIsModalShowing(false)} />
              <div className="betinfo bets">{showBets()}</div>
            </div>
          </div>
        )}
      </Transition>

      {/* You were trying to figure out why the odds were not updating in mobile and also
            trying to update the markup of yhis component, since the buttons would always be on the screen
             */}
      <div className="mobilebets__bottom">
        <button className="uk-button uk-button-primary betlist" onClick={() => openModal('selectedMatches', true)}>
          <span>Betlist</span>
          <span className="circle">{props.selectedMatches.length}</span>
        </button>
        <button className="uk-button uk-button-primary bet-cashout" onClick={() => openModal('placedBets', true)}>
          <span>Cashout</span>
          <span className="circle">{props.placedBets.length}</span>
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedMatches: state.selectedMatches,
    placedBets: state.placedBets
  }
}
export default connect(mapStateToProps, null)(MobileBets)
