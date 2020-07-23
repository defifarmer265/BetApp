import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Leagues from './Leagues'
import '../css/sidebar.scss'
import {ReactComponent as Cancel} from '../icons/cancel.svg'
import {ReactComponent as Home} from '../icons/home.svg'
import {ReactComponent as Search} from '../icons/search.svg'
import {ReactComponent as Live} from '../icons/live.svg'
import {ReactComponent as Jackpot} from '../icons/jackpot.svg'
import {ReactComponent as Livescore} from '../icons/livescore.svg'
import {ReactComponent as Virtual} from '../icons/virtual.svg'
import {ReactComponent as Load} from '../icons/load.svg'
function Sidebar({isOpen, closeModal}) {
    const renderSidebar = ()=>{
           return(
            <div className={`sidebar-modal ${isOpen ? 'w-100' : 'w-0'}`}>
                <div className={`sidebar ${isOpen ? 'sidebar__show' : 'sidebar__no-show'}`}>
                    <div className="sidebar__main">
                        <div className="sidebar__main-top">
                            <div className="sidebar__main-top-action">
                                <Cancel onClick={()=>closeModal()}/> 
                                <div className="sidebar__main-top-action-home">
                                    <Link>
                                    <Home />
                                        <span>Home</span>
                                    </Link>
                                </div>
                            </div>
                           <div className="sidebar__main-top-input">
                               <Search />
                               <input className="uk-input uk-form-width-medium header__input" 
                                placeholder="Search"
                                type="text" />
                           </div>
                           <div className="sidebar__main-top-buttons">
                               <div className="button-link">
                                    <Live />
                                    <span>
                                        Live Games
                                    </span>
                               </div>
                               <div className="button-link">
                                    <Virtual />
                                    <span>
                                        Virtuals
                                    </span>
                               </div>
                               <div className="button-link">
                                    <Live />
                                    <span>
                                        Load Code
                                    </span>
                               </div>
                               <div className="button-link">
                                    <Jackpot />
                                    <span>
                                        Jackpot
                                    </span>
                               </div>
                               <div className="button-link">
                                    <Livescore />
                                    <span>
                                        Livescores
                                    </span>
                               </div>
                           </div>
                    
                        </div>
                        <div className="sidebar__main-bottom">
                            <Leagues /> 
                        </div>
                       
                    </div>                    
                </div>  
                         
            </div>
        ) 
        // }
        // return <div></div>
        
    }
    return (
        renderSidebar()
    )
}

export default Sidebar

