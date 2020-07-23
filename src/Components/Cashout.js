import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { fetchBets } from "../actions";
import '../css/cashout.scss'
import {ReactComponent as Arrow} from '../icons/arrow.svg' 
import SingleBetMatch from './SingleBetMatch'
const Cashout=({authUser, fetchBets, placedBets})=>{
    // useEffect(()=>{
    //     if(authUser){
    //        fetchBets(authUser.localId) 
    //     }
    // }, [authUser, fetchBets])
    const renderBets = ()=>{
        if(placedBets.length > 0){
          return placedBets.map((bet)=>(
            <div className="cashout__matches">
                
                <div className="cashout__state">
                    <span>Multiple</span> <div className="status"><span>PENDING</span><Arrow /></div>
                </div>
                <SingleBetMatch bet={bet} />
            </div>
        ))  
        }
        return(<div className="no-bets">
            <span>
                You havent placed any bet🤔
            </span>
            
            </div>)    
        
    }
    return <div className="cashout">
            {!authUser ? (
                <div className="no-bets">
                    <span>
                    No bets at the moment👌
                    </span>
                </div>
            ) : renderBets()}
                
            </div>
}


const mapStateToProps =(state)=>{
    // console.log("moprps", state.posts)
    return {
                authUser: state.authUser,
                placedBets: state.placedBets
            }
}
export default connect(mapStateToProps, null)(Cashout)