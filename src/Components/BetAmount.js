import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import '../css/betAmount.scss'
import {useFormik} from 'formik'
import BetPlaced from './BetPlaced'
import {ReactComponent as Cancel} from '../icons/cancel.svg'
import Modal from './Modal'
import {fetchBets} from '../actions'
import {updateBetAmount} from '../actions/auth'
import * as Yup from 'yup'

const BetAmount = props => {
  const {values, handleSubmit, getFieldProps, touched, errors, setFieldValue} = useFormik({
    initialValues: {
      betAmount: 0
    },
    validationSchema: Yup.object().shape({
      betAmount: Yup.number().min(100, 'Cannot be less than 100').max(props.betAmount, 'Bet Amount cannot exceed balance').positive('Amount cannot be negative').required('Required')
    }),
    onSubmit(values) {
      try {
        placeBet('placed', true)
      } catch (err) {}
    }
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [betType, setBetType] = useState('')
  const [totalOdd, setTotalOdd] = useState(0)
  const [bonus, setBonus] = useState(0)
  const [potentialWin, setPotentialWin] = useState(0)
  const setAmount = amount => {
    setFieldValue('betAmount', amount)
  }
  const calcTotalOdd = () => {
    const filteredMatches = props.selectedMatches.filter(match => match.checked === true)
    const combinedOdd = filteredMatches.reduce((acc, item) => acc * Number(parseFloat(item.marketOdd)), 1)
    setTotalOdd(filteredMatches.length === 0 ? 0 : combinedOdd)
  }

  const calcWinning = () => {
    setPotentialWin(totalOdd * values.betAmount)
  }

  const calcBonus = () => {
    setBonus(0.4 * potentialWin)
  }

  const showBetInfo = (betType, modalState) => {
    setBetType(betType)
    setIsModalOpen(modalState)
  }
  const placeBet = async (betType, modalState) => {
    try {
      await axios.post(`https://betapp-54dbf.firebaseio.com/betlist/${props.authUser.localId}.json`, {
        selectedMatches: props.selectedMatches,
        betAmount: values.betAmount,
        win: potentialWin + bonus,
        time: Date.now()
      })
      props.updateBetAmount(props.betAmount - values.betAmount)
      props.fetchBets(props.authUser.localId)
      setBetType(betType)
      setIsModalOpen(modalState)
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }
  const betInfo = () => {
    // setBetType(betType)
    const modal =
      isModalOpen && betType ? (
        <Modal>
          <div className="modal__body" style={{maxWidth: '450px', padding: '10px'}}>
            <Cancel onClick={() => showBetInfo('', false)} />
            <BetPlaced betType={betType} />
          </div>
        </Modal>
      ) : (
        ''
      )
    return modal
  }

  useEffect(() => {
    calcTotalOdd()
    calcWinning()
    calcBonus()
    return () => {
      if (props.selectedMatches.length === 0) {
        setTotalOdd(0)
        values.betAmount = 0
        setBonus(0)
        setPotentialWin(0)
      }
    }
  }, [props.selectedMatches, values.betAmount, totalOdd, bonus])

  return (
    <div className="betAmount">
      {betInfo()}
      <form onSubmit={handleSubmit} noValidate>
        <div className="betAmount__details">
          <div className="betAmount__details-money">
            <small className="info">Amount</small>
            <div className="input">
              <input
                className={`${errors['betAmount'] && props.authUser ? 'uk-form-danger' : ''} uk-input uk-form-width-xsmall`}
                {...getFieldProps('betAmount')}
                type="number"
                placeholder="Amount"
                style={{width: '70px', height: '26px', textAlign: 'right'}}
              />
              <span className="invalid-feedback">{props.authUser && touched['betAmount'] && errors['betAmount']}</span>
            </div>
          </div>
          {/* {this.state.betAmount} */}
          <div className="betAmount__details-winning">
            <small className="info">Bonus</small>
            <div className="money">
              <span>NGN</span>&nbsp;
              <h3 className="content">{bonus.toFixed(2)}</h3>
            </div>
          </div>
          <div className="betAmount__details-bonus">
            <small className="info">Odds</small>
            <h3 className="content">{totalOdd.toFixed(2)}</h3>
          </div>
          <div className="betAmount__details-winning">
            <small className="info">Potential Win</small>
            <div className="money">
              <span>NGN</span>&nbsp;
              <h3 className="content">
                {(potentialWin + bonus).toFixed(2)}
                {/* P.Win */}
              </h3>
            </div>
          </div>
        </div>
        <div className="betAmount__actions">
          <div className="betAmount__actions-suggest">
            <div className="betAmount__actions-suggest-button" onClick={() => setAmount(0)}>
              RESET
            </div>
            <div className="betAmount__actions-suggest-button" onClick={() => setAmount(100)}>
              100
            </div>
            <div className="betAmount__actions-suggest-button" onClick={() => setAmount(500)}>
              500
            </div>
            <div className="betAmount__actions-suggest-button" onClick={() => setAmount(1000)}>
              1000
            </div>
          </div>
          <div className="betAmount__actions-buttons">
            <button className="uk-button uk-button-default uk-button-small cancel">Cancel</button>
            {props.authUser ? (
              <button className={`uk-button uk-button-default uk-button-small bet ${!errors.betAmount ? 'active' : ''}`} type="submit">
                Bet
              </button>
            ) : (
              <button className="uk-button uk-button-default uk-button-small bet active" onClick={() => showBetInfo('booked', true)}>
                Book Bet
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  // console.log("moprps", state.posts)
  return {
    selectedMatches: state.selectedMatches,
    authUser: state.authUser,
    betAmount: state.betAmount
  }
}
export default connect(mapStateToProps, {fetchBets, updateBetAmount})(BetAmount)
