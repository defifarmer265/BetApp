import React from 'react'
import '../css/leagues.scss'
import {ReactComponent as Star} from '../icons/star.svg'
import {fetchLeagues} from '../actions'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class Leagues extends React.Component{
    // const leagues = ['Man Utd', 'Chelsea', 'Liverpool', 'Everton', 'Sansiro']
    // const renderLeagues = return leagues.map(league=> <li>
    //         league
    //     </li>)
    lops(id){
        document.getElementById(`${id}`).classList.toggle("selected")
    }
    renderLeagues(){
        return this.props.leagues.map(league=> <li className="list-group-item">
                                                    <NavLink
                                                    className="league-link"
                                                    activeStyle={{
                                                        fontWeight: "700",
                                                      }}
                                                     to={`/league/${league.key}`}>
                                                        {league.title}
                                                    </NavLink> <Star id={league.key} onClick={()=>this.lops(league.key)} />
                                                </li>)
        }
        componentDidMount(){
            this.props.fetchLeagues()
        }
        render(){
            console.log(this.props.leagues)
            return(
             <div className="leagues">
                <ul className="uk-list uk-list-divider list-group">
                    {this.renderLeagues()}
                </ul>
            </div>   
            )
    }
    }
const mapStateToProps =(state)=>{
    // console.log("moprps", state.posts)
    return {leagues: state.leagues}
}
export default connect(mapStateToProps, {fetchLeagues})(Leagues)