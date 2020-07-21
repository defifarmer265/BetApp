import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectMatch} from '../actions'
import SelectedMatches from "./SelectedMatches";
import Cashout from './Cashout'
import '../css/betInfo.scss'

class BetInfo extends React.Component{
    state={currentComp: 'betslip', bookingCode: ''}
    componentDidMount(){
        // console.log(Formik)
    }
    onInputChange=(e)=>{
        this.setState({bookingCode: e.target.value})
    }
        checkCurrenturrentComp(comp){
            return this.state.currentComp === comp ? 'active' : ''
        }
        renderBody(){
            if(this.state.currentComp === 'betslip'){
                if(this.props.selectedMatches.length > 0){
                   return <SelectedMatches /> 
                }
                return (
                    <div className="book-bet">
                    <p className="book-bet__info">To place a bet, click on the odds. Or insert a booking code</p>
                    
                    <div className="">
                        <select className="uk-select">
                            <option>Nigeria</option>
                            <option>Kenya</option>
                            <option>Ghana</option>
                        </select>
                    </div>
                    <div className="">
                        <input className="uk-input" type="text" placeholder="Booking Code"  value={this.state.bookingCode} onChange={this.onInputChange} />
                    </div>
                    <button class={`uk-button uk-button-default uk-width-1-1 ${this.state.bookingCode ? 'active' : 'inactive'}`}>Load</button>
                    <p className="book-bet__detail">A booking code enables one to transfer a betslip between different devices.</p>
                    </div>
                )
                
            }
            return <Cashout />
        }

    render(){
        console.log("check updated")
        return(
        <div className="betinfo">
            <div className="betinfo__option">
                <div onClick={()=>this.setState({currentComp: 'betslip'})} className={`betinfo__option-betslip ${this.checkCurrenturrentComp('betslip')}`}>
                    <div>BetSlip</div> <span className="circle">{this.props.selectedMatches.length}</span>
                </div>
                <div onClick={()=>this.setState({currentComp: 'cashout'})} className={`betinfo__option-cashout ${this.checkCurrenturrentComp('cashout')}`}>
                <div>Cashout</div> <span className="circle">{this.props.placedBets.length}</span>
                </div>
            </div>
            {this.renderBody()}
            
        </div>
    )
    }
    
}
const mapStateToProps =(state)=>{
    return {selectedMatches: state.selectedMatches,
            placedBets: state.placedBets}
}
export default connect(mapStateToProps, null)(BetInfo)