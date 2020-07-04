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
    renderLeagues(){
        return this.props.leagues.map(league=> <li className="list-group-item">
                                                    <NavLink
                                                    activeStyle={{
                                                        fontWeight: "bold",
                                                        color: "red"
                                                      }}
                                                     to={`/league/${league.key}`}>
                                                        {league.title}
                                                    </NavLink>
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