import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches} from '../actions'
import BetMatch from './BetMatch'
import '../css/betGroup.scss'
// import './'
// import '../css/betGroup.scss'
class BetInfo extends React.Component{
    state={matches: []}
componentDidMount(){
    // console.log(this.props.matches)

}
renderMatches(){
    let theDates = []
    this.props.matches.forEach((val)=>theDates.push(val.commence_time))
    let theUniques = []
    theUniques = [...new Set(theDates)]
    const els = []
    let previous= 0
    theUniques.forEach((el, index, arr)=>{
    let formatedUnix= `${new Date(el * 1000).getMonth()}/${new Date(el * 1000).getDate()}`
    let date = new Date(el * 1000)
    if(previous !== formatedUnix){
    els.push(
        <tr key={el}>
            <td colSpan="2" className="match_date">{`${date.getDate().toString().length===1 ? '0'+date.getDate() : date.getDate()}/${date.getMonth().toString().length===1 ? '0'+(date.getMonth()+1) : date.getMonth()}
            ${date.toLocaleString("default", { weekday: "long" })}`}</td>
        </tr>    
    )}
    this.props.matches.filter(match=> match.commence_time === el)
    .forEach((match, index, arr)=>{
        els.push(
        <BetMatch key={match.match_id} match={match} />
        )
    })
    previous = `${new Date(el * 1000).getMonth()}/${new Date(el * 1000).getDate()}`
    })
return els;
}
render(){
    return(
        <div className="betGroup">
            <table className="">
                <thead>
                    <tr>
                    <th className=""></th>
                    <th className="teams"></th>
                    <th className="">Home</th>
                    <th className="">Draw</th>
                    <th className="">Away</th> 
                    </tr>                    
                </thead>
                <tbody>
                    {this.renderMatches()}
                </tbody>
            </table>
            
        </div>
    )
}
}

// const mapStateToProps =(state)=>{
//     // console.log("moprps", state.posts)
//     return {matches: state.matches}
// }
export default connect(null, {fetchMatches})(BetInfo)