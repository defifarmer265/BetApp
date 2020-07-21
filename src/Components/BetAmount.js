import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import '../css/betAmount.scss'
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import BetPlaced from './BetPlaced'
import {ReactComponent as Cancel} from '../icons/cancel.svg'
import Modal from './Modal'
import { fetchBets } from "../actions";

const BetAmount = (props)=>{
    const formik = useFormik({
        initialValues: {
          betAmount: 0
        },
        onSubmit(values) {
          // This will run when the form is submitted
        }
      });
    // const [betAmount, setBetAmount] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [betType, setBetType] = useState('')
    const [totalOdd, setTotalOdd] = useState(0)
    const [bonus, setBonus] = useState(0)
    const [potentialWin, setPotentialWin] = useState(0)
      const setAmount = (amount)=>{
        //   console.log(amount)
        // formik.values.betAmount = amount
        formik.setFieldValue("betAmount", amount)
      }
    const calcTotalOdd = ()=>{
        const filteredMatches = props.selectedMatches
        .filter(match=>match.checked === true)
        const combinedOdd =  
        filteredMatches.reduce(
            (acc, item)=> acc * Number(parseFloat(item.marketOdd)), 1
        )
        setTotalOdd(filteredMatches.length === 0 ? 0 : combinedOdd)
        // console.log(`From Calc Odd---Total Odd: ${totalOdd} 
        // Bet Amount: ${formik.values.betAmount}
        // Potential Win: ${potentialWin}
        // Bonus: ${bonus}`)
    }

    const calcWinning = ()=>{        
        setPotentialWin(totalOdd*formik.values.betAmount)
        // console.log(`From calcWin---Total Odd: ${totalOdd} 
        // Bet Amount: ${formik.values.betAmount}
        // Potential Win: ${potentialWin}
        // Bonus: ${bonus}`)
    }
    
    const calcBonus = ()=>{
        // console.log("The betamount from bonus is:"+this.state.betAmount)
        setBonus(0.4*potentialWin) 
        // console.log(`lmaooo bonus calculated, and the current potential win is: ${potentialWin}`)
    }

    const checkAmountError = (comp)=>{
        return formik.values.betAmount < 100 ? 'uk-form-danger' : ''
    }

    const showBetInfo = (betType, modalState)=>{
        setBetType(betType)
        setIsModalOpen(modalState)
    }
    const placeBet = async (betType, modalState)=>{
        await axios.post(`https://betapp-54dbf.firebaseio.com/betlist/${props.authUser.localId}.json`, {
            selectedMatches: props.selectedMatches,
            betAmount: formik.values.betAmount,
            win: potentialWin + bonus,
            time: Date.now()
        })
        props.fetchBets(props.authUser.localId)
        setBetType(betType)
        setIsModalOpen(modalState)

    }
    const betInfo = ()=>{
        // setBetType(betType)
        const modal = isModalOpen && betType ? (
            <Modal>
              <div className="modal__body" style={{maxWidth: '450px', padding: '10px'}}>                                      
                <Cancel onClick={()=>showBetInfo('', false)}/>
                <BetPlaced betType={betType}/>
              </div>
            </Modal>
          ) : ''
          return modal
  }

    useEffect(()=>{
        calcTotalOdd()
        calcWinning()
        calcBonus()
        return()=>{
            // console.log("sec func")
            if(props.selectedMatches.length === 0){
                setTotalOdd(0)
                formik.values.betAmount = 0
                setBonus(0)
                setPotentialWin(0)
            }
        }

    },
    [props.selectedMatches, formik.values.betAmount, totalOdd, bonus])

    return(
        <div className="betAmount">
            {betInfo()}
               <form onSubmit={formik.handleSubmit} noValidate>
                <div className="betAmount__details">
                <div className="betAmount__details-money">
               <small className="info">Amount</small>
                    <div class="input">
                    
                        <input class={`${checkAmountError()} uk-input uk-form-width-xsmall`}
                        name="betAmount"
                        type="text" 
                        placeholder="Amount"
                        style={{width: '70px', height: '26px', textAlign: 'right'}}
                        value={formik.values.betAmount} 
                        onChange={formik.handleChange}
                        />
                        {/* <ErrorMessage
                    component="div"
                    name="betAmount"
                    className="invalid-feedback"
                    /> */}
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
                    <h3 className="content">
                        {/* {
                         this.calcTotalOdd() === 1 ? 0 :this.calcTotalOdd().toFixed(2) || 0 
                        } */}
                        {totalOdd.toFixed(2)}
                    </h3>
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
                    <div className="betAmount__actions-suggest-button" onClick={()=>setAmount(0)}>RESET</div>
                    <div className="betAmount__actions-suggest-button" onClick={()=>setAmount(100)}>100</div>
                    <div className="betAmount__actions-suggest-button" onClick={()=>setAmount(500)}>500</div>
                    <div className="betAmount__actions-suggest-button" onClick={()=>setAmount(1000)}>1000</div>
                </div>
                <div className="betAmount__actions-buttons">
                <button class="uk-button uk-button-default uk-button-small cancel">Cancel</button>
                {
                    props.authUser ? 
                    <button class="uk-button uk-button-default uk-button-small bet" onClick={()=>placeBet('placed', true)}>Bet</button>
                    :<button class="uk-button uk-button-default uk-button-small bet" onClick={()=>showBetInfo('booked', true)}>Book Bet</button>
                }
                </div>
            </div>
            </form>
            
            
        </div>
    )

}

const mapStateToProps =(state)=>{
    // console.log("moprps", state.posts)
    return {
                selectedMatches: state.selectedMatches,
                authUser: state.authUser,
                betAmount: state.betAmount
            }
}
export default connect(mapStateToProps, {fetchBets})(BetAmount)
//db-url: https://betapp-54dbf.firebaseio.com
//auth-url: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]