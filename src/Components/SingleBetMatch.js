import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { shortenText, months_names } from "../utils/utils";

export const SingleBetMatch = ({bet}) => {
    const [viewLength, setViewLength] = useState(4)
    const [shortenTextLen, setShortenTextLen] = useState(21)
    
    useEffect(()=>{
        var matchedMedia = window.matchMedia("(max-width: 673px)")
            if(matchedMedia.matches){
                setShortenTextLen(35)
            }
    }, [])
    
    const  date = new Date(bet.time)
    const showViewMore = ()=>{
        if(bet.selectedMatches.length > 4){
            return(
                viewLength !== bet.selectedMatches.length ?
                    <div className="view-all" onClick={()=>setViewLength(bet.selectedMatches.length)}>view all...</div> :
                    <div className="view-all" onClick={()=>setViewLength(4)}>view less...</div>
            )
        }
        return
        
    }
    return (
        <>
        <div className="cashout__match">
                <div className="cashout__match-date">
    <span className="cashout__match-date--day">{date.getDate().toString().length === 1 ? '0'+ date.getDate() : date.getDate()}</span>
    <span>{months_names[date.getMonth()]}</span>
                </div>
                <div className="cashout__match-selections">
                    {bet.selectedMatches.map((match, index)=>(index < viewLength ?
                        <React.Fragment key={match.match_id}><span key={match.match_id} title={`${match.home_team} v ${match.away_team}`}>{shortenText(`${match.home_team} v ${match.away_team}`, 0, shortenTextLen)} <span className="market">{match.market}</span></span> <br /></React.Fragment> : ''
                    ))}
                </div>               
                
            </div>
            {showViewMore()}
                <div className="cashout__info">
                    <div className="cashout__info-stake">
                        <div>Total Stake(NGN)</div>
                        <div className="detail">{bet.betAmount}</div>
                    </div>
                    <div className="cashout__info-winning">
                        <div>Total Return</div>
                        <div className="detail">{bet.win.toFixed(2)}</div>
                    </div>
                </div>
            </>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBetMatch)
