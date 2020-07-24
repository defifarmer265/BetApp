import React from 'react'
import {connect} from 'react-redux'
import {selectMatch} from '../actions'
import {shortenText} from '../utils/utils'
import {ReactComponent as Stats} from '../icons/statistics.svg'

const BetMatch=(props)=>{
        function selectMatch(market){
            // const matchIncluded = props.selectedMatches.some(match=> match.match_id === props.match.match_id)
            // if(!matchIncluded){
                //this means that the match is not included in the array so add it with checked: true
                props.selectMatch({...market,
                    checked: true ,
                    home_team: props.match.teams[0], 
                    away_team: props.match.teams[1], 
                    match_id: props.match.match_id,
                    last_update: props.match.sites[0].last_update
                })
            // }
            // else{
            //     //so the match is there, so it should be removed then. Call selectMatch and dont add the checked property, because that determines what happensa in the reducer
            //    props.selectMatch({
            //         match_id: props.match.match_id
            //     })
            // }
            
        }
        const checkSelected = (market)=>{
            const foundSelected = props.selectedMatches.find(match=> match.match_id === props.match.match_id)
            // console.log(foundSelected)
            if(foundSelected && market === foundSelected.market){
                return 'matchSelected'
            }
            return ''
        }
        const matchTime = `${new Date(1000 *props.match.commence_time)
            .getHours()}:${new Date(1000 *props.match.commence_time)
            .getMinutes().toString().length===1 ? new Date(1000 *props.match.commence_time)
            .getMinutes()+ '0' : new Date(1000 *props.match.commence_time)
            .getMinutes()}`
    return(
        <tr className="betMatch" style={{borderBottom: '2pt solid red'}}>
            <td style={{width: '100px', fontWeight: 400}}>
                <span className="match_detail">
                    {matchTime}
                </span>
            
                <span className="teamShow">
                <div className="teamShow__stats">
                    <Stats />
                    <span>
                    {matchTime}
                    </span>
                </div>
                <div className="teamShow__teams">
                    {shortenText(props.match.home_team, 0, 15)} 
                <br /> 
                {shortenText(props.match.away_team, 0, 15)}
                </div>
                 
                </span>
                </td>
            <td className="teamView">
                <div className="teamView__teams">
                    {shortenText(props.match.home_team, 0, 15)} 
                <br /> 
                {shortenText(props.match.away_team, 0, 15)}
                </div>
                <div className="teamView__stats">
                    <Stats />
                </div>   
            </td>
            <td><button className={`uk-button uk-button-default uk-button-small ${checkSelected('Homewin')}`} onClick={()=>selectMatch({marketOdd: props.match.sites[0].odds.h2h[0].toFixed(2), market: "Homewin"})}>{props.match.sites[0].odds.h2h[0].toFixed(2)}</button></td>
            <td><button className={`uk-button uk-button-default uk-button-small ${checkSelected('Draw')}`} onClick={()=>selectMatch({marketOdd: props.match.sites[0].odds.h2h[2].toFixed(2), market: "Draw"})}>{props.match.sites[0].odds.h2h[2].toFixed(2)}</button></td>
            <td><button className={`uk-button uk-button-default uk-button-small ${checkSelected('Awaywin')}`} onClick={()=>selectMatch({marketOdd: props.match.sites[0].odds.h2h[1].toFixed(2), market: "Awaywin"})}>{props.match.sites[0].odds.h2h[1].toFixed(2)}</button></td>
        </tr>
    )
}
const mapStateToProps =(state)=>{
    // console.log("moprps", state.posts)
    return {selectedMatches: state.selectedMatches}
}
export default connect(mapStateToProps, {selectMatch})(BetMatch)