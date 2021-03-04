import React from 'react'
import {v4 as uuidv4} from 'uuid'
import '../assets/css/betPlaced.scss'
import {shortenText} from '../utils/utils'
import {ReactComponent as Confirm} from '../assets/icons/confirm.svg'

function betPlaced({betType}) {
  const betCode = uuidv4()
  return (
    <div className="betPlaced">
      <div className="betPlaced__icon">
        <Confirm />
        <div className="betPlaced__message">
          <h3>Bet {betType} successfully✍🏾</h3>
          <span className="betPlaced__message-code">
            Your {betType === 'booked' ? 'Booking Code' : 'Bet ID'} is 👇🏾 <br />
            <span className="bet-code" title={betCode}>
              {betType === 'booked' ? betCode.split('-')[0].toUpperCase() : shortenText(betCode, 0, 25)}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default betPlaced
