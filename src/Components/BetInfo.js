import React from 'react'
import {connect} from 'react-redux'
import {selectMatch} from '../actions'
import BetAmount from './BetAmount'
import Cashout from './Cashout'
import '../css/betInfo.scss'
import {ReactComponent as Football} from '../icons/footbal.svg'
import {ReactComponent as Cancel} from '../icons/cancel.svg'
class BetInfo extends React.Component{
    state={currentComp: 'betslip'}
    componentDidMount(){
        // console.log(Formik)
    }
    shortenText(text,startingPoint ,maxLength){
        return text.length > maxLength?
           `${text.slice(startingPoint, maxLength)}...`:
           text
        }
        checkCurrenturrentComp(comp){
            return this.state.currentComp === comp ? 'active' : ''
        }
        unCheck(match_id){
            console.log(document.getElementById(match_id).checked)

            // document.getElementById(match_id).checked = document.getElementById(match_id).checked
            this.props.selectMatch({
                match_id,
                checked: document.getElementById(match_id).checked
            })

        }
        renderBody(){
            if(this.state.currentComp === 'betslip'){
                return(
                    <div className="betinfo__body">
                        <div className="betinfo__remove"><span>Remove All</span></div>
                        {this.renderselectedMatches()}
                        <BetAmount />
                    </div>
                )
            }
            return <Cashout />
        }
    renderselectedMatches(){
        return this.props.selectedMatches.map(match=>{
            return (<div className="betInfo">
                        <div className="betInfo__selected">
                            <div className="betInfo__selected-box">
                            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                <label><input class="uk-checkbox" name={match.match_id} type="checkbox" id={match.match_id} onClick={()=>this.unCheck(match.match_id)} defaultChecked/></label>
                            </div>
                            </div>
                        </div>
                        <div className="betInfo__main">
                            <div className="betInfo__main-top">
                               <Football /> 
                                <p className="market">{match.market}</p>
                            </div>
                            <div className="betInfo__main-middle"
                             title={`${match.home_team} v ${match.away_team}`}>
                                <small>
                                    {match.last_update
                                    .toString()
                                    .slice(match.last_update.toString().length-4
                                    , match.last_update.toString().length)}
                                </small> | <small>{this.shortenText(`${match.home_team} v ${match.away_team}`, 0, 16)}</small>
                            </div>
                            <div className="betInfo__main-bottom">
                                <small>1X2</small>
                            </div>
                            
                        </div>
                        <div className="betInfo__action">
                            <div className="betInfo__action-cancel" 
                            onClick={()=>this.props.selectMatch(
                                {
                                match_id: match.match_id,
                                }
                                )}>
                               <Cancel />  
                            </div>
                           <div className="betInfo__action-odd">
                               {match.marketOdd}
                           </div>
                        </div>
                        
                    </div>)
        })
    }
    render(){
        return(
        <div className="betinfo">
            <div className="betinfo__option">
                <div onClick={()=>this.setState({currentComp: 'betslip'})} className={`betinfo__option-betslip ${this.checkCurrenturrentComp('betslip')}`}>
                    <div>BetSlip</div> <span className="circle">{this.props.selectedMatches.length}</span>
                </div>
                <div onClick={()=>this.setState({currentComp: 'cashout'})} className={`betinfo__option-cashout ${this.checkCurrenturrentComp('cashout')}`}>
                    <div>Cashout</div> <span className="circle">4</span>
                </div>
            </div>
            {this.renderBody()}
            
        </div>
    )
    }
    
}
const mapStateToProps =(state)=>{
    return {selectedMatches: state.selectedMatches}
}
export default connect(mapStateToProps, {selectMatch})(BetInfo)