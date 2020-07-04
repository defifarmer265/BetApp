import React from 'react'
import {connect} from 'react-redux'
import {selectMatch} from '../actions'
import BetAmount from './BetAmount'
import '../css/betInfo.scss'
import {ReactComponent as Football} from '../icons/footbal.svg'
import {ReactComponent as Cancel} from '../icons/cancel.svg'
class BetInfo extends React.Component{
    shortenText(text,startingPoint ,maxLength){
        return text.length > maxLength?
           `${text.slice(startingPoint, maxLength)}...`:
           text
        }
    renderselectedMatches(){
        return this.props.selectedMatches.map(match=>{
            return (<div className="betInfo">
                        <div className="betInfo__selected">
                            <div className="betInfo__selected-box">
                                
                            </div>
                        </div>
                        <div className="betInfo__main">
                            <div className="betInfo__main-top">
                               <Football /> 
                                <p className="market">{match.market}</p>
                            </div>
                            <div className="betInfo__main-middle">
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
            {this.renderselectedMatches()}
            <BetAmount />
        </div>
    )
    }
    
}
const mapStateToProps =(state)=>{
    return {selectedMatches: state.selectedMatches}
}
export default connect(mapStateToProps, {selectMatch})(BetInfo)