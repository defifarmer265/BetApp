import React, {useState} from 'react'
import {connect} from 'react-redux'
import {ReactComponent as Arrow} from '../icons/arrow.svg'
import '../css/mobileBets.scss'
import SelectedMatches from "./SelectedMatches";
const MobileBets = ()=> {
    console.log("rerendering MobileBet")
    const [isMatchesShowing, setIsMatchesShowing] = useState(false)
    const [currentComp, setCurrentComp] = useState('bets')

    return (
        <div className="mobilebets">
            {isMatchesShowing ? 
            <div className="mobilebets__content">
                <div className="mobilebets__top">
                    <Arrow onClick={()=>setIsMatchesShowing(false)} />
                    <div className="betinfo bets">
                        <SelectedMatches />
                    </div>                 
                </div>
            </div>
                 : ''
            }
                   
            {/* You were trying to figure out why the odds were not updating in mobile and also
            trying to update the markup of yhis component, since the buttons would always be on the screen
             */}
            <div className="mobilebets__bottom">
                    <button class="uk-button uk-button-primary betlist" onClick={()=>setIsMatchesShowing(true)}>Betlist</button>
                    <button class="uk-button uk-button-primary cashout">Cashout</button>
            </div>
            </div>
    )
}

const mapStateToProps =(state)=>{
    return {selectedMatches: state.selectedMatches}
}
export default connect(mapStateToProps, null)(MobileBets)
