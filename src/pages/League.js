import React from 'react'
import {connect} from 'react-redux'
import'../css/mainView.scss'; 
import {fetchLeagueMatches} from '../actions'
import BetGroup from '../Components/BetGroup'
import {ReactComponent as Refresh} from '../icons/refresh.svg'
import {ReactComponent as LoadIcon} from '../icons/money-bag.svg' 

class MainView extends React.Component{
    state={leaguesLoaded: false}
    async componentDidMount(){
        // console.log(this.props.posts)
        await this.props.fetchLeagueMatches(this.props.match.params.league)
        // console.log("fetched")
    }
    componentDidUpdate(prevProps){
        if(prevProps.match.params.league !== this.props.match.params.league){
            this.props.fetchLeagueMatches(this.props.match.params.league)
        }
    }
    render(){
        return(
        <div className="league">
            {
                !this.props.matchesFetched ? 
                    (
                        <div className="load-screen">
                            <LoadIcon />
                        </div>
                    ) :
                (
                    <div className="mainview">
                    <div className="mainview__top">
                    <div className="latest">
                            <span className="circle"></span>
                            <h2>Upcoming Matches</h2>
                        </div>
                        <div className="refresh">
                            <span>Refresh</span>
                            <Refresh />
                        </div>
                    </div>
                    
                    {/* <ul className="uk-tab">
                        <li className="uk-active"><a href="#">Left</a></li>
                        <li><a href="#">Item</a></li>
                        <li><a href="#">Item</a></li>
                    </ul> */}
                    {this.props.matches.length > 0 ? (<div className="mainview__matches">
                        <BetGroup matches={this.props.matches}/>
                    </div>)
                    : <p style={{textAlign: 'center'}}>No matches</p>}
                    
                </div>
                )
            }
        </div>  )                
        }
    }    

//this guy would merge the redux state to the component's prop
const mapStateToProps =(state)=>{
    // console.log("moprps", state.posts)
    return {
        matches: state.selectedLeagueMatches,
        matchesFetched: state.leagueMatchesFetched
    }
}
//so by passing the action creator to the connet method, anytime the method is called, the action gets dispatched
//automatically
export default connect(mapStateToProps, {fetchLeagueMatches})(MainView)