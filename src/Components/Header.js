import React from 'react'
import '../css/header.scss'
const Header = ()=>{
    return(
        <nav className="uk-navbar-container uk-margin" uk-navbar>
            <div className="uk-navbar-left">

                <a className="uk-navbar-item uk-logo" href="#">BetApp</a>
                
                <div className="uk-navbar-item uk-margin-auto-left">
                    <form action="javascript:void(0)">
                        <input className="uk-input uk-form-width-small uk-margin-small-right" type="text" placeholder="Input"/>
                        <input className="uk-input uk-form-width-small" type="text" placeholder="Input"/>
                        <button className="uk-button uk-button-default">Login</button>
                    </form>
                </div>

            </div>
        </nav>
    )
}

export default Header