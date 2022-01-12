import { useState } from 'react';
import { ADD_USER } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth'


export default function Form() {
  // States for registration
 const [ signupState, setSignupState ] = useState({
   username: '',
   email: '',
   password: '',
 })

  //Use ADD USER mutation
  const [addUser, { error }] = useMutation(ADD_USER);
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  // Handling the form submission
  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignupState({
      ...signupState,
      [name]: value
    })
  

  };
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...signupState }
      });;

      Auth.login(data.addUser.token);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="signUp">
      <div>
        <h1>Register</h1>
      </div>
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <form className="registerForm">
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input onChange={handleChange} className="input"
          name='username'
          value={signupState.username} type="text" />
        <label className="label">Email</label>
        <input onChange={handleChange} className="input"
          name='email'
          value={signupState.email} type="email" />
        <label className="label">Password</label>
        <input onChange={handleChange} className="input"
          name='password'
          value={signupState.password} type="password" />
        <button onClick={handleSignupSubmit} className="Signupbtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}