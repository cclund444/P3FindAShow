import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import  Auth  from '../utils/auth'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'

export default function Login(props) {
  const [loginState, setLoginState] = useState({ email: '', password: ''});
  const [login, { error }] = useMutation(LOGIN_USER);

  function validateForm() {
    return loginState.email.length > 0 && loginState.password.length > 0;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginState({
      ...loginState,
      [name]: value
    });
  };


  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      const { data } = await login({
        variables: { ...loginState }
      });
      Auth.login(data.login.token)
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            name='email'
            type="email"
            value={loginState.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='password'
            type="password"
            value={loginState.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      {error && <div>Login Failed</div>}
    </div>
  );
}

