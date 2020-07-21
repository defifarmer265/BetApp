import React from 'react'
import {connect} from 'react-redux'
import {ReactComponent as Facebook} from '../icons/facebook.svg'
import '../css/modal.scss'
import { ErrorMessage, useFormik } from "formik";
import {signUp} from '../actions/auth'
 const Register = ({signUp, onRegistered})=> {
    const formik = useFormik({
        initialValues: {
              email: '',
              password: ''
        },        
        async onSubmit(values) {
            console.log("email: "+ formik.values.email)
          await signUp({email: formik.values.email, password: formik.values.password})
            onRegistered()
            //display errors, check if the api returns an error the use formik's error to display error
        }
      });
    return (
        <form onSubmit={formik.handleSubmit}>

    <div className="uk-width-1-1">
        <div className="uk-inline uk-width-1-1">
            <span className="uk-form-icon" uk-icon="icon: user"></span>
            <input className="uk-input" type="text" 
            name="email"
            placeholder="test@gmail.com"
            value={formik.values.email} 
            onChange={formik.handleChange}/>
        </div>
    </div>

    <div className="uk-width-1-1">
        <div className="uk-inline uk-width-1-1">
            <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
            <input className="uk-input first-input" 
            type="password" 
            name="password"
            placeholder="password"
            value={formik.values.password} 
            onChange={formik.handleChange}/>
        </div>
    </div>
    <button className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom action" type="submit">Register</button>
        <div className="login__option">
            <div className="facebook-login">
                <Facebook />
            </div>
            <p className="login__option-detail">Login with Facebook</p>
        </div>
        
        
</form>
    )
}

const mapStateToProps = (state) => {
    return {authUser: state.authUser}
}
export default connect(mapStateToProps, {signUp})(Register)