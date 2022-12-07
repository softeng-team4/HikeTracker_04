import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import LocalGuideForm from './LocalGuideForm';
import HutWorkerForm from './HutWorkerForm';


function validPhoneNumber(phoneNumber) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
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

  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;
    let e = {
      email: false,
      password: false,
      confirmedPassword: false,
      phoneNumber: false,
      firstName: false,
      lastName: false,
      hutId: false
    };
    if (password === '' || password.length < 6) {
      valid = false;
      e.password = true;
    }
    let checkIfValidEmail = isEmail(username); // true for good email
    if (!checkIfValidEmail) {
      valid = false;
      e.email = true;
    }
    if (password !== confirmPassword) {
      valid = false;
      e.confirmedPassword = true;
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
    if (!valid) {
      console.log("ERROR")
    } else {
      console.log("Valid data");
    }

    // if (valid) {
      const user = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role,
        phoneNumber: phoneNumber,
        hutId: role === "Hut worker" ? hutId : undefined
      }
    //   props.signup(user)
    //     .then(() => {
    //       setSubmitted(true);
    //     }).catch((err) => {
    //       console.log(err);
    //       setErrorMessage("Error: " + err.code);
    //     });
    // }
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
        <Container className="col-sm-8 col-12 below-nav">
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
              <Form.Label>Email</Form.Label>
              <Form.Control className='email' type='email' required value={username} isInvalid={!!error.email} onChange={ev => setUsername(ev.target.value)} />
              <Form.Control.Feedback type="invalid">Invalid email address.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control className='password' type='password' required value={password} isInvalid={!!error.password} onChange={ev => setPassword(ev.target.value)} autoComplete="on" />
              <Form.Control.Feedback type="invalid">Password must be at least six character long.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='confirm_password'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control className='confirm_password' type='password' value={confirmPassword} isInvalid={!!error.confirmedPassword} onChange={ev => setConfirmPassword(ev.target.value)} autoComplete="on" />
              <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control className='firstName' required type='text' value={firstName} isInvalid={!!error.firstName} onChange={ev => setFirstName(ev.target.value)} />
              <Form.Control.Feedback type="invalid">First name cannot be empty.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control className='lastName' required type='text' value={lastName} isInvalid={!!error.lastName} onChange={ev => setLastName(ev.target.value)} />
              <Form.Control.Feedback type="invalid">Last name cannot be empty.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='phoneNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control className='phoneNumber' type='text' required value={phoneNumber} isInvalid={!!error.phoneNumber} onChange={ev => setPhoneNumber(ev.target.value)} />
              <Form.Control.Feedback type="invalid">Invalid phone number.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='role'>
              <Form.Label>Select your role</Form.Label>
              <Form.Select onChange={ev => setRole(ev.target.value)}>
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