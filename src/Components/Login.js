import React from 'react'
import {connect} from 'react-redux'
import {ReactComponent as Facebook} from '../assets/icons/facebook.svg'
import '../assets/css/modal.scss'
import {useFormik} from 'formik'
import {signIn} from '../store/actions/auth'
const Login = ({signIn, onLogin}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    async onSubmit() {
      await signIn({email: formik.values.email, password: formik.values.password})
      onLogin()
      //display errors, check if the api returns an error the use formik's error to display error
    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="uk-width-1-1">
        <div className="uk-inline uk-width-1-1">
          <span className="uk-form-icon" uk-icon="icon: user"></span>
          <input className="uk-input" type="text" name="email" placeholder="test@gmail.com" value={formik.values.email} onChange={formik.handleChange} />
        </div>
      </div>

      <div className="uk-width-1-1">
        <div className="uk-inline uk-width-1-1">
          <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
          <input className="uk-input first-input" type="password" name="password" placeholder="password" value={formik.values.password} onChange={formik.handleChange} />
        </div>
      </div>
      <button className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom action" type="submit">
        Register
      </button>
      <div className="login__option">
        <div className="facebook-login">
          <Facebook />
        </div>
        <p className="login__option-detail">Login with Facebook</p>
      </div>
    </form>
  )
}

const mapStateToProps = state => {
  return {authUser: state.authUser}
}
export default connect(mapStateToProps, {signIn})(Login)
