import React from 'react'
import {connect} from 'react-redux'
import '../css/betAmount.scss'
class BetAmount extends React.Component{
    state={totalOdd: 0}
    calcTotalOdd(){
        return this.props.selectedMatches.reduce(
            (acc, item)=> acc * Number(parseFloat(item.marketOdd).toFixed(2)), 1
        )
    }
    render(){
       return(
        <div className="betAmount">
            <div className="betAmount__details">
                <div className="betAmount__details-money">
                    <small>Amount</small>
                    <input className="input" type="text" name="" id=""/>
                </div>
                <div className="betAmount__details-bonus">
                    <small>Bonus</small>
                    <h3>343</h3>
                </div>
                <div className="betAmount__details-bonus">
                    <small>Odds</small>
                    <h3>
                        {
                         this.calcTotalOdd() || 0 
                        }
                    </h3>
                </div>
                <div className="betAmount__details-winning">
                    <small>Potential Win</small>
                    <div className="money">
                        NGN
                       <h3>674</h3> 
                    </div>
                </div>
            </div>
            <div className="betAmount__actions">
                <div className="betAmount__actions-suggest">
                    <div className="betAmount__actions-suggest-button">RESET</div>
                    <div className="betAmount__actions-suggest-button">100</div>
                    <div className="betAmount__actions-suggest-button">500</div>
                    <div className="betAmount__actions-suggest-button">1000</div>
                </div>
                <div className="betAmount__actions-buttons">
                    <button>
                        Bet
                    </button>
                </div>
            </div>
        </div>
    ) 
    }
    
}

const mapStateToProps =(state)=>{
    // console.log("moprps", state.posts)
    return {selectedMatches: state.selectedMatches}
}
export default connect(mapStateToProps, null)(BetAmount)