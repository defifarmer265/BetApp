import React, { Component } from 'react'
import { connect } from 'react-redux'
import {selectMatch, clearSelectedMatches, removeMatch, checkMatch} from '../actions'
import BetAmount from './BetAmount'
import {ReactComponent as Football} from '../icons/footbal.svg'
import {ReactComponent as Cancel} from '../icons/cancel.svg'
import {shortenText} from '../utils/utils'
export class SelectedMatches extends Component {

    renderBody(){
            return(
                <div className="betinfo__body">
                    <div className="betinfo__remove"><span onClick={()=>this.props.clearSelectedMatches()}>Remove All</span></div>
                    {this.renderselectedMatches()}
                    {this.props.selectedMatches.length > 0 ? <BetAmount /> : null}
                    
                </div>
            )
    }
    renderselectedMatches(){
        return this.props.selectedMatches.map(match=>{
            return (<div className="betInfo">
                        <div className="betInfo__selected">
                            <div className="betInfo__selected-box">
                            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                <label><input class="uk-checkbox" name={match.match_id} type="checkbox" id={match.match_id} onClick={()=>this.unCheck(match.match_id, match.checked)} checked={match.checked}/></label>
                            </div>
                            </div>
                        </div>
                        <div className="betInfo__main">
                            <div className="betInfo__main-top">
                                <div className="betInfo__main-top-content">
                                 <Football /> 
                                <p className="market">{match.market}</p>   
                                </div>
                               
                            </div>
                            <div className="betInfo__main-middle"
                             title={`${match.home_team} v ${match.away_team}`}>
                                <span>
                                    {match.last_update
                                    .toString()
                                    .slice(match.last_update.toString().length-4
                                    , match.last_update.toString().length)}
                                </span> | <span>{shortenText(`${match.home_team} v ${match.away_team}`, 0, 16)}</span>
                            </div>
                            <div className="betInfo__main-bottom">
                                <span>1X2</span>
                            </div>
                            
                        </div>
                        <div className="betInfo__action">
                            <div className="betInfo__action-cancel" 
                            onClick={()=>this.props.removeMatch(
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
    de
    unCheck(match_id, match_checked){
        console.log(document.getElementById(match_id).checked)

        // document.getElementById(match_id).checked = document.getElementById(match_id).checked
        this.props.checkMatch({
            match_id,
            checked: !match_checked
            // checked: document.getElementById(match_id).checked
        })

    }
    render() {
        return (
            <div>
                {this.renderBody()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedMatches: state.selectedMatches
})

const mapDispatchToProps = {
    selectMatch, clearSelectedMatches, removeMatch, checkMatch
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedMatches)
