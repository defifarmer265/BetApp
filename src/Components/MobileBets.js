import React, {useState} from 'react'
import {connect} from 'react-redux'
import {ReactComponent as Arrow} from '../icons/arrow.svg'
import '../css/mobileBets.scss'
import SelectedMatches from "./SelectedMatches";
import BookBet from "./BookBet";
import Cashout from './Cashout'
const MobileBets = (props)=> {
    console.log("rerendering MobileBet")
    const [isModalShowing, setIsModalShowing] = useState(false)
    const [currentComp, setCurrentComp] = useState('bets')
    const openModal = (comp, modalShow)=>{
        setCurrentComp(comp)
        setIsModalShowing(modalShow)
    }
    const showBets = ()=>{
        if(currentComp === 'selectedMatches'){
            if(props.selectedMatches.length > 0){
                return <SelectedMatches />
            }
            else{
                return <BookBet />
            }

        }
        return <Cashout />
    }
    return (
        <div className="mobilebets">
            {isModalShowing ? 
            <div className="mobilebets__content">
                <div className="mobilebets__top">
                    <Arrow onClick={()=>setIsModalShowing(false)} />
                    <div className="betinfo bets">
                        {showBets()}
                        
                    </div>                 
                </div>
            </div>
                 : ''
            }
                   
            {/* You were trying to figure out why the odds were not updating in mobile and also
            trying to update the markup of yhis component, since the buttons would always be on the screen
             */}
            <div className="mobilebets__bottom">
                    <button class="uk-button uk-button-primary betlist" onClick={()=>openModal('selectedMatches', true)}>Betlist</button>
                    <button class="uk-button uk-button-primary bet-cashout" onClick={()=>openModal('placedBets', true)}>Cashout</button>
            </div>
            </div>
    )
}

const mapStateToProps =(state)=>{
    return {selectedMatches: state.selectedMatches}
}
export default connect(mapStateToProps, null)(MobileBets)
