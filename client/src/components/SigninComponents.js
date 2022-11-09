import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useState } from 'react';
//import { Redirect } from 'react-router';

function SigninForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');

    let valid = true;
    if (username === '' || username.search('@') === -1 || password === '' || password.length < 6) {
      valid = false;
      setErrorMessage('Email cannot be empty and password must be at least six character long.');
    }
    if (firstName === '') {
      valid = false;
      setErrorMessage('First name cannot be empty.');
    }
    if (lastName === '') {
      valid = false;
      setErrorMessage('Last name cannot be empty.');
    }
    console.log(role);
    if (valid) {
      props.signin(username, password, firstName, lastName)
        .catch((err) => {
          setErrorMessage("Email already used");
          valid = false;
        });
    }
    if (valid) {
      setSubmitted(true);
    }
  };

  return (
    <>{
      submitted ?
        <Card>
          <Card.Body>Check your email to complete the process!!!</Card.Body>
        </Card> :
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
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type='text' value={firstName} onChange={ev => setFirstName(ev.target.value)} />
            </Form.Group>
            <Form.Group controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type='text' value={lastName} onChange={ev => setLastName(ev.target.value)} />
            </Form.Group>
            <Form.Group controlId='role'>
              <Form.Label>Select your role</Form.Label>
              <Form.Control as="select"
                custom
                onChange={ev => setRole(ev.target.value)}
              >
                <option value="Hiker">Hiker</option>
                <option value="Local guide">Local guide</option>
              </Form.Control>
            </Form.Group>
            <Button onClick={handleSubmit}>Sign Up</Button>
          </Form>
        </Container>
    }</>)

}


export { SigninForm };