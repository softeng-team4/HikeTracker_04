import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useState } from 'react';
//import { Redirect } from 'react-router';
import isEmail from 'validator/lib/isEmail';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');

    let valid = true;
    if (username === '' || username.search('@') === -1 || password === '' || password.length < 6) {
      valid = false;
      setErrorMessage('Email cannot be empty and password must be at least six character long.');
    }
    let checkIfValidEmail = isEmail(username); // true for good email
    if(!checkIfValidEmail){
      valid = false;
      setErrorMessage('Invalid email address.');
    }
    if (valid) {
      props.login(username, password)
        .catch((err) => {
          console.log(err);
          if (err.message === "Email not verified!") {
            setErrorMessage("Email not verified! (Check your spam)");
          } else {
            setErrorMessage("Error: " + err.code);
          }
        });
    }
  };

  return (
    <Container className="col-sm-8 col-12 below-nav">
      <Form onSubmit={handleSubmit}>
        {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
        <Form.Group controlId='username'>
          <Form.Label >Email</Form.Label>
          <Form.Control className='email-input' type='email' value={username} onChange={ev => setUsername(ev.target.value)} />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label >Password</Form.Label>
          <Form.Control className='password-input' type='password' value={password} onChange={ev => setPassword(ev.target.value)} autoComplete="on" />
        </Form.Group>
        <div align="right" style={{ marginTop: 10 }}>
          <Button type="submit">Login</Button>
        </div>
      </Form>
    </Container>)
}

function LogoutButton(props) {
  return (
    <Button variant="outline-light" onClick={props.logout}>Logout</Button>
  )
}

export { LoginForm, LogoutButton };