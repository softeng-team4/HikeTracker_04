import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout, DefaultRoute } from './components/View';
import { useEffect, useState } from 'react';
import API from './API.js'
import NavBar from './components/NavBar';
import AuthenticationContext from './components/AuthenticationContext';
import { Container, Row, Col } from 'react-bootstrap';
import { LoginForm } from './components/LoginComponents';
import { SigninForm } from './components/SigninComponents';


function App() {

  //states of authentication of an Admin
  const [authUser, setAuthUser] = useState(undefined);
  const [authErr, setAuthErr] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  //login and logut functions
  const login = async (email, password) => {
    try {
      const user = await API.logIn(email, password);
      setAuthUser(user);
    } catch (err) {
      console.log(err);
      setAuthErr(err);
    }
  }
  const logout = async () => {
    try {
    await API.logOut();
    setAuthUser(undefined);
    setAuthErr(undefined);
    } catch(err) {
      console.log(err);
    }
  }

  const signup = async (email, password, firstName, lastName, role) => {
    try {
      const user = await API.signUp(email, password, firstName, lastName, role);
    } catch (err) {
      console.log(err);
      setMessage({ msg: err, type: 'danger' });
    }
  }

  //value for AuthenticationContext
   let authObject = {
     authUser: authUser,
     authErr: authErr,
     onLogin: login,
     onLogout: logout
  };


  return (
    <>
      <AuthenticationContext.Provider value={authObject}>
        <BrowserRouter>
          <NavBar />
          <Container fluid>
            <Row>
              <Col lg={2}/>
              <Col>
                <Routes>

                  <Route path='/' element={<AppLayout />}></Route>

                  <Route path='/' element={<AppLayout onLogOut={logout} loggedIn={login}/>}></Route>
                  <Route path='/login' element={authUser ? <Navigate to='/'/> : <LoginForm login={login} />}/>
                  <Route path='/signup' element={<SigninForm signup={signup}/>}></Route>

                  <Route path='*' element={<DefaultRoute />} />

                </Routes>
              </Col>
              <Col lg={2}/>
            </Row>
          </Container>
        </BrowserRouter>
      </AuthenticationContext.Provider>
    </>
  );
}

export default App;

