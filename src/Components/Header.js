import React, {useState} from 'react'
import * as Yup from "yup";
import '../css/header.scss'
import '../css/modal.scss'
import Sidebar from './Sidebar'
import Modal from './Modal'
import UserForm from './UserForm'
import CreditAccount from './CreditAccount'
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
import { useFormik } from "formik";
export const Header = ({signIn, authUser, betAmount, signOut}) => {
    const [error, setError] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalBody, setModalBody] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [showBalance, setShowBalance] = useState(true)
      const [currentComp, setCurrentComp] = useState("Register")
      const {
        handleSubmit,
        getFieldProps,
        touched,
        errors,
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
      const showCurrentComp = (modalBody, modalState)=>{
        setModalBody(modalBody)
        setIsModalOpen(modalState)
    }
//       const betInfo = ()=>{
//         // setBetType(betType)
//         const modal = isModalOpen && betType ? (
//             <Modal>
//               <div className="modal__body" style={{maxWidth: '450px', padding: '10px'}}>                                      
//                 <Cancel onClick={()=>showBetInfo('', false)}/>
//                 <CreditAccount betType={betType}/>
//               </div>
//             </Modal>
//           ) : ''
//           return modal
//   }
      const ModalComp = 
                (<Modal>
                    {modalBody === 'userForm' ?
                  (<div className="modal__body">                       
                    
                     <>
                     <div className="modal__body-top">                          
                          <div className="modal__body-top-info">
                              <div className="content">
                                  <div className={`register ${currentComp === 'Register' ? 'active' : ''} `} onClick={()=>setCurrentComp('Register')}>Register</div>
                                <div className={`login ${currentComp === 'Login' ? 'active' : ''}`} onClick={()=>setCurrentComp('Login')}>Login</div>
                              </div>
                          </div>
                          <div className="modal__body-top-cancel">
                            <Cancel onClick={()=>setIsModalOpen(false)}/>
                        </div>
                      </div>
                      <div className="modal__body-bottom">
                          <div className="ball"></div>                          
                          <div className="modal__body-main">
                                {/* {currentComp === 'Register' ? <Register onRegistered={()=>setIsModalOpen(false)} currentComp={currentComp} /> : <Login onLogin={()=>setIsModalOpen(false)}/>} */}
                                <UserForm onRegistered={()=>setIsModalOpen(false)} currentComp={currentComp} />
                            </div> 
                      </div>
                      </>                                         
                    
                </div>) : 
                <div className="modal__body" style={{maxWidth: '450px', padding: '10px'}}>
                    <div className="modal__body-top deposit">
                        <span className="modal__text">Credit Account</span>
                        <Cancel onClick={()=>setIsModalOpen(false)}/>
                    </div>
                    <CreditAccount close={()=>setIsModalOpen(false)} />
              </div> }
                </Modal>)
      
      const isSignedIn=  ()=>{
          return(
              <div className="header__options-auth">
                  <div className="header__options-auth--web">
                     <div className="balance"><span className="amount">NGN{showBalance ? betAmount : '*****'}<span className={`visible ${showBalance ? '' : 'hide-balance'}`} onClick={()=>{setShowBalance(!showBalance)}}><Visible /></span></span></div>
                  <div className="deposit" onClick={()=>showCurrentComp('deposit', true)}><span>Deposit</span></div>
                  <div className="uk-button-group button-group">
                    <button className="uk-button uk-button-default uk-button-small header__button">&nbsp;<span role="img" aria-label="no-bet">My Account👇</span> </button>
                        <div className="uk-inline header__button-open">
                            <button className="uk-button uk-button-default uk-button-small header__button header__button-open-on" type="button"><span uk-icon="icon:  triangle-down"></span></button>
                            <div uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;" className="uk-padding-remove header__dropdown">
                                <ul className="uk-nav uk-dropdown-nav">
                                    <li>Gifts</li>
                                    <li>Wiithdraw</li>
                                    <li>My Account Info</li>
                                    <li>Transactions</li>
                                    <li className="uk-nav-divider"></li>
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
                  <button className="uk-button uk-button-default uk-button-small header__options-auth--mobile-button" onClick={()=>showCurrentComp('deposit', true)}>Deposit</button>
                  
                  <div className="user">
                  <div className="uk-inline header__button-open">
                            <button className="uk-button uk-button-default uk-button-small header__button header__button-open-on" type="button"><span uk-icon="icon:  triangle-down"></span></button>
                            <div uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;" className="uk-padding-remove header__dropdown">
                                <ul className="uk-nav uk-dropdown-nav">
                                    <li>Gifts</li>
                                    <li>Wiithdraw</li>
                                    <li>My Account Info</li>
                                    <li className="balance">Balance: {betAmount}</li>
                                    <li className="uk-nav-divider"></li>
                                    <li className="logout" onClick={()=>signOut()}>Logout</li>
                                </ul>
                            </div>
                        </div>
                     <User /> 
                  </div>
                  </div>
              </div>
          )
      }
      
      
    return (
        <nav className="uk-navbar-container uk-margin header" uk-navbar="true">
            {isModalOpen ? ModalComp : null}
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
                <button class="uk-button uk-button-default uk-button-small header__register" onClick={()=>showCurrentComp('userForm', true)}>Register</button>
                <div className="facebook">
                    <Facebook />
                </div>
                </div>
                <div className="header__options-mobile">
                    <div className="search uk-margin-remove-right">
                     <Search /> 
                    </div>
                    <button class="uk-button uk-button-default uk-button-small header__register" onClick={()=>showCurrentComp('userForm', true)}>Register/Login</button>                    
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
