import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useState } from 'react';
//import { Redirect } from 'react-router';

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

    if (valid) {
      props.login(username, password)
        .catch((err) => { 
          console.log("errore ", err);
          if(err instanceof TypeError){
            if(err.message === "Email not verified!"){
              setErrorMessage("Email not verified! (Check your spam)");
            }
          }else{
            setErrorMessage(err.message);
          }
        })
    }
  };

  return (
    <Container className="col-sm-8 col-12 below-nav">
      <Form>
        {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
        <Form.Group controlId='username'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
        </Form.Group>

        <Button onClick={handleSubmit}>Login</Button>
      </Form>
    </Container>)
}

function LogoutButton(props) {
  return (
    <Button variant="outline-light" onClick={props.logout}>Logout</Button>
  )
}

export { LoginForm, LogoutButton };