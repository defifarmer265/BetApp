import React, {useState} from 'react'
import * as Yup from "yup";
import '../css/header.scss'
import '../css/modal.scss'
import Sidebar from './Sidebar'
import Modal from './Modal'
import Login from './Login'
import UserForm from './UserForm'
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions/auth'
import {Link} from 'react-router-dom'
import {ReactComponent as Cancel} from '../icons/cancel.svg'
import {ReactComponent as Logo} from '../icons/logo.svg'
import {ReactComponent as Visible} from '../icons/visible.svg'
import {ReactComponent as Menu} from '../icons/menu.svg'
import {ReactComponent as User} from '../icons/user.svg'
import {ReactComponent as Search} from '../icons/search.svg'
import {ReactComponent as Facebook} from '../icons/facebook.svg'
import { ErrorMessage, useFormik } from "formik";
export const Header = ({signIn, authUser, betAmount, signOut}) => {
    const [error, setError] = useState('')
      const {
        values,
        handleSubmit,
        getFieldProps,
        touched,
        errors,
        setFieldValue
      } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .required("Required")
          }),
          async onSubmit(values) {
              setError('')
            try{
                await signIn({email: values.email, password: values.password})
            }
            catch(err){
                setError('Incorrect email/password')
                console.log("lmaoo error")
            }
          
        }
      });
      const ModalComp = ()=>{
            const modal = isModalOpen ? (
                <Modal>
                  <div className="modal__body">
                      <div className="modal__body-top">
                          <div className="modal__body-top-cancel">
                              <Cancel onClick={()=>setIsModalOpen(false)}/>
                          </div>
                          <div className="modal__body-top-info">
                              <div className="content">
                                  <div className={`register ${currentComp === 'Register' ? 'active' : ''} `} onClick={()=>setCurrentComp('Register')}>Register</div>
                                <div className={`login ${currentComp === 'Login' ? 'active' : ''}`} onClick={()=>setCurrentComp('Login')}>Login</div>
                              </div>
                              
                          </div>
                        
                      </div>
                      <div className="modal__body-bottom">
                          <div className="ball"></div>                          
                          <div className="modal__body-main">
                                {/* {currentComp === 'Register' ? <Register onRegistered={()=>setIsModalOpen(false)} currentComp={currentComp} /> : <Login onLogin={()=>setIsModalOpen(false)}/>} */}
                                <UserForm onRegistered={()=>setIsModalOpen(false)} currentComp={currentComp} />
                            </div> 
                      </div>
                                           
                    
                  </div>
                </Modal>
              ) : ''
              return modal
      }
      const isSignedIn=  ()=>{
          return(
              <div className="header__options-auth">
                  <div className="header__options-auth--web">
                     <div className="balance"><span className="amount">NGN{betAmount}<span className="visible"><Visible /></span></span></div>
                  <div className="deposit"><span>Deposit</span></div>
                  <div class="uk-button-group button-group">
                    <button class="uk-button uk-button-default uk-button-small header__button">My Account</button>
                        <div class="uk-inline header__button-open">
                            <button class="uk-button uk-button-default uk-button-small header__button header__button-open-on" type="button"><span uk-icon="icon:  triangle-down"></span></button>
                            <div uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;" className="uk-padding-remove header__dropdown">
                                <ul class="uk-nav uk-dropdown-nav">
                                    <li>Gifts</li>
                                    <li>Wiithdraw</li>
                                    <li>My Account Info</li>
                                    <li>Transactions</li>
                                    <li class="uk-nav-divider"></li>
                                    <li className="logout" onClick={()=>signOut()}>Logout</li>
                                </ul>
                            </div>
                        </div>
                </div> 
                  </div>
                  <div className="header__options-auth--mobile">
                  <div className="search">
                     <Search /> 
                  </div>
                  <button class="uk-button uk-button-default uk-button-small header__options-auth--mobile-button">Deposit</button>
                  
                  <div className="user">
                     <User /> 
                  </div>
                  </div>
              </div>
          )
      }
      const [isOpen, setIsOpen] = useState(false)
      const [isModalOpen, setIsModalOpen] = useState(false)
      const [currentComp, setCurrentComp] = useState("Register")
      
    return (
        <nav className="uk-navbar-container uk-margin header" uk-navbar>
            {ModalComp()}
        <div className="uk-navbar-left header__body">
            <div className="header__body-left">
                <div className="header__body-left-menu" onClick={()=>setIsOpen(true)}>
                    <Menu />
                </div>
                <Link className="uk-navbar-item uk-logo header__body-left-logo uk-padding-remove" href="#" to="/"><Logo /></Link>
            </div>
            <Sidebar closeModal={()=>setIsOpen(false)} isOpen={isOpen} />
            
            
            <div className="uk-navbar-item uk-margin-auto-left header__options uk-padding-remove">
                {
                    authUser ? isSignedIn() :
                    <>
                    <div className="header__options-web">
                    <form  onSubmit={handleSubmit}>
                        <div className="form-content">
                          <input className="uk-input uk-form-width-medium header__input" 
                            type="text" 
                            {...getFieldProps("email")}
                            placeholder="Email"/>  
                            {error ? (<span className="error">{error}</span>): null}
                            <span className="error">
                                {touched["email"] && errors["email"]}
                            </span>
                        </div>
                        <div className="form-content">
                           <input className="uk-input uk-form-width-small header__input" 
                            type="password" 
                            {...getFieldProps("password")}
                            placeholder="Password"/> 
                            <span className="error">
                                {touched["password"] && errors["password"]}
                            </span>
                        </div>
                    
                    <button className={`uk-button uk-button-default uk-button-small header__button ${(!errors.email && !errors.password && (touched["email"] || touched["password"])) ? 'active' : ''}`} type="submit">Log in</button>
                </form>
                <button class="uk-button uk-button-default uk-button-small header__register" onClick={()=>setIsModalOpen(true)}>Register</button>
                <div className="facebook">
                    <Facebook />
                </div>
                </div>
                <div className="header__options-mobile">
                    <div className="search uk-margin-remove-right">
                     <Search /> 
                    </div>
                    <button class="uk-button uk-button-default uk-button-small header__register" onClick={()=>setIsModalOpen(true)}>Register/Login</button>                    
                </div>
                </>
                }
                
            </div>

        </div>
        
    </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        authUser: state.authUser,
        betAmount: state.betAmount
    }
}

export default connect(mapStateToProps, {signIn, signOut})(Header)
