import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import HutWorkerForm from './HutWorkerForm';
import User from '../../model/User'
import Spacer from '../BrowserHikeComponents/Spacer';



function validPhoneNumber(phoneNumber) {
  let phoneno = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
  if (phoneNumber.match(phoneno)) {
    console.log("Valid phone number");
    return true;
  }
  else {
    console.log("Invalid phone number");
    return false;
  }
}

function SignupForm(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('Hiker');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({ email: false, password: false, confirmedPassword: false, phoneNumber: false, firstName: false, lastName: false });
  const [hutId, setHutId] = useState('');
  const [hutSelected, setHutSelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const validInputs = () =>{
    let valid = true;
    let e = {
      email: false,
      password: false,
      confirmedPassword: false,
      username: false,
      phoneNumber: false,
      firstName: false,
      lastName: false,
      hutId: false
    };
    if (password === '' || password.length < 6) {
      valid = false;
      e.password = true;
    }
    let checkIfValidEmail = isEmail(email); // true for good email
    if (!checkIfValidEmail) {
      valid = false;
      e.email = true;
    }
    if (password !== confirmPassword) {
      valid = false;
      e.confirmedPassword = true;
    }
    if (username === '') {
      valid = false;
      e.username = true;
    }
    if (firstName === '') {
      valid = false;
      e.firstName = true;
    }
    if (lastName === '') {
      valid = false;
      e.lastName = true;
    }
    if (!validPhoneNumber(phoneNumber)) {
      valid = false;
      e.phoneNumber = true;
    }
    if(role === "Hut worker" && hutSelected === false){
      valid = false;
      e.hutId = true;
    }
    setError(e);
    return valid;

  }

  function handleEmail (event) {
    setEmail(event.target.value)
  }

  function handlePassword (event) {
    setPassword(event.target.value)
  }  
  
  function handleConfirmPassword (event) {
    setConfirmPassword(event.target.value)
  }

  function handleUsername (event) {
    setUsername(event.target.value)
  }

  function handleFirstName (event) {
    setFirstName(event.target.value)
  }

  function handleLastName (event) {
    setLastName(event.target.value)
  }

  function handlePhoneNumber (event) {
    setPhoneNumber(event.target.value)
  }

  function handleRole (event) {
    setRole(event.target.value)
  }  

  function handleSubmit (event) {
    event.preventDefault();
    const valid = validInputs();
    
    if (valid) {
      const userClass = new User(
        email,
        username,
        firstName,
        lastName,
        phoneNumber,
        "Hiker",
        role !== "Hiker" ? role : undefined, 
        role !== "Hiker" ? "pending" : undefined,
        undefined,
        role === "Hut worker" ? hutId : undefined);
      props.signup(userClass, password)
        .then(() => {
          setSubmitted(true);
        }).catch((err) => {
          console.log(err);
          setErrorMessage("Error: " + err.code);
        });
    }
  };

  const hutSelection = (hut) => {
    setHutId(hut);
    setHutSelected(true);
  }

  return (
    <>{
      submitted ?
        <Alert key={'success'} variant={'success'}>
          Check your email to complete the registration process.
        </Alert> :
        <Container className="col-sm-8 col-12 below-nav" style={{ marginBottom: 20 }}>
          <Spacer height='2rem' />
          <Form noValidate onSubmit={handleSubmit}>
          {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control className='email' type='email' required value={email} isInvalid={!!error.email} onChange={handleEmail} />
              <Form.Control.Feedback type="invalid">Invalid email address.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control className='password' type='password' required value={password} isInvalid={!!error.password} onChange={handlePassword} autoComplete="on" />
              <Form.Control.Feedback type="invalid">Password must be at least six character long.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='confirm_password'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control className='confirm_password' type='password' value={confirmPassword} isInvalid={!!error.confirmedPassword} onChange={handleConfirmPassword} autoComplete="on" />
              <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control className='username' type='text' required value={username} isInvalid={!!error.username} onChange={handleUsername} />
              <Form.Control.Feedback type="invalid">Username cannot be empty.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control className='firstName' required type='text' value={firstName} isInvalid={!!error.firstName} onChange={handleFirstName} />
              <Form.Control.Feedback type="invalid">First name cannot be empty.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control className='lastName' required type='text' value={lastName} isInvalid={!!error.lastName} onChange={handleLastName} />
              <Form.Control.Feedback type="invalid">Last name cannot be empty.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='phoneNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control className='phoneNumber' type='text' required value={phoneNumber} isInvalid={!!error.phoneNumber} onChange={handlePhoneNumber} />
              <Form.Control.Feedback type="invalid">Invalid phone number.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='role'>
              <Form.Label>Select your role</Form.Label>
              <Form.Select onChange={handleRole}>
                <option value="Hiker">Hiker</option>
                <option value="Local guide">Local guide</option>
                <option value="Hut worker">Hut worker</option>
              </Form.Select>
            </Form.Group>
            {role === "Hut worker" ?
              <HutWorkerForm hutSelection={hutSelection}>
              </HutWorkerForm>
              : null}
            {role === "Hut worker" && error.hutId ?
              <Alert variant='danger'>Hut workers must select an hut.</Alert>
            : null}
            <div align="right" style={{ marginTop: 10 }}>
              <Button type="submit">Sign Up</Button>
            </div>
          </Form>
        </Container>
    }</>)

}

export { SignupForm };