import React, {useState} from 'react'
import {connect} from 'react-redux'
import * as Yup from 'yup'
import '../css/modal.scss'
import {useFormik} from 'formik'
import {signUp, signIn} from '../actions/auth'
const Register = ({signUp, onRegistered, currentComp, signIn}) => {
  //  console.log(currentComp)
  const [error, setError] = useState('')
  // const formik = useFormik({
  //     initialValues: {
  //           email: '',
  //           password: ''
  //     },
  //     async onSubmit(values) {
  //         console.log("email: "+ formik.values.email)
  //       await signUp({email: formik.values.email, password: formik.values.password})
  //         onRegistered()
  //         //display errors, check if the api returns an error the use formik's error to display error
  //     }
  //   });
  const {handleSubmit, getFieldProps, touched, errors} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    async onSubmit(values) {
      setError('')
      try {
        if (currentComp === 'Register') {
          await signUp({email: values.email, password: values.password})
        } else {
          await signIn({email: values.email, password: values.password})
          // alert("login")
        }
        onRegistered()
      } catch (err) {
        setError('Incorrect email/password')
        console.log(err)
      }
    }
  })
  const buttonText = currentComp === 'Register' ? 'Register' : 'Login'
  return (
    <form onSubmit={handleSubmit}>
      {/* {error ? (<span className="error">{error}</span>): null} */}
      <div className="uk-width-1-1">
        <span className="error">
          {error ? <span className="error">{error}</span> : null}
          {touched['email'] && errors['email']}
        </span>
        <div className="uk-inline uk-width-1-1">
          <span className="uk-form-icon" uk-icon="icon: user"></span>
          <input className="uk-input" type="text" {...getFieldProps('email')} placeholder="test@gmail.com" />
        </div>
      </div>

      <div className="uk-width-1-1">
        <span className="error">{touched['password'] && errors['password']}</span>
        <div className="uk-inline uk-width-1-1">
          <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
          <input className="uk-input first-input" type="password" {...getFieldProps('password')} placeholder="password" />
        </div>
      </div>
      <button
        className={`uk-button no-opaq uk-button-default uk-width-1-1 uk-margin-small-bottom action ${!errors.email && !errors.password && (touched['email'] || touched['password']) ? 'activee' : ''}`}
        type="submit"
      >
        {buttonText}
      </button>
      {/* <div className="login__option">
            <div className="facebook-login">
                <Facebook />
            </div>
            <p className="login__option-detail">Login with Facebook</p>
        </div> */}
    </form>
  )
}

const mapStateToProps = state => {
  return {authUser: state.authUser}
}
export default connect(mapStateToProps, {signUp, signIn})(Register)
