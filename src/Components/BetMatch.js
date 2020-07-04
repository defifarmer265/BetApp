import React from 'react'
import {connect} from 'react-redux'
import {selectMatch} from '../actions'

const BetMatch=(props)=>{
    const shortenText=(text,startingPoint ,maxLength)=> {
        return text.length > maxLength?
           `${text.slice(startingPoint, maxLength)}...`:
           text
        }
        function selectMatch(market){
            props.selectMatch({...market, 
                home_team: props.match.teams[0], 
                away_team: props.match.teams[1], 
                match_id: props.match.match_id,
                last_update: props.match.sites[0].last_update
            })
        }
        const checkSelected = (market)=>{
            const foundSelected = props.selectedMatches.find(match=> match.match_id === props.match.match_id)
            // console.log(foundSelected)
            if(foundSelected && market === foundSelected.market){
                return 'matchSelected'
            }
            return ''
        }
    return(
        <tr className="betMatch" style={{borderBottom: '2pt solid red'}}>
            <td style={{width: '100px', fontWeight: 600}}>
                {`${new Date(1000 *props.match.commence_time)
                    .getHours()}:${new Date(1000 *props.match.commence_time)
                    .getMinutes().toString().length===1 ? new Date(1000 *props.match.commence_time)
                    .getMinutes()+ '0' : new Date(1000 *props.match.commence_time)
                    .getMinutes()}`}<br />
                <span className="teamShow">
                {shortenText(props.match.home_team, 0, 11)} <br /> {shortenText(props.match.away_team, 0, 11)}
                </span>
                </td>
            <td className="teamView">{shortenText(props.match.home_team, 0, 15)} <br /> {shortenText(props.match.away_team, 0, 15)}</td>
            <td><button className={`uk-button uk-button-default uk-button-small ${checkSelected('homewin')}`} onClick={()=>selectMatch({marketOdd: props.match.sites[0].odds.h2h[0].toFixed(2), market: "homewin"})}>{props.match.sites[0].odds.h2h[0].toFixed(2)}</button></td>
            <td><button className={`uk-button uk-button-default uk-button-small ${checkSelected('draw')}`} onClick={()=>selectMatch({marketOdd: props.match.sites[0].odds.h2h[2].toFixed(2), market: "draw"})}>{props.match.sites[0].odds.h2h[2].toFixed(2)}</button></td>
            <td><button className={`uk-button uk-button-default uk-button-small ${checkSelected('awaywin')}`} onClick={()=>selectMatch({marketOdd: props.match.sites[0].odds.h2h[1].toFixed(2), market: "awaywin"})}>{props.match.sites[0].odds.h2h[1].toFixed(2)}</button></td>
        </tr>
    )
}
const mapStateToProps =(state)=>{
    // console.log("moprps", state.posts)
    return {selectedMatches: state.selectedMatches}
}
export default connect(mapStateToProps, {selectMatch})(BetMatch)