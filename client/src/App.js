import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout, DefaultRoute } from './components/View';
import { useEffect, useState } from 'react';
// import API from './API.js'
import NavBar from './components/NavBar';
import AuthenticationContext from './components/AuthenticationContext';
import { Container, Row, Col } from 'react-bootstrap';

import { HikeForm } from './components/HikeForm';

function App() {


  //states of authentication of an Admin
  const [authUser, setAuthUser] = useState(undefined);
  const [authErr, setAuthErr] = useState(undefined);


  //login and logut functions
  const login = (email, pwd) => {
    // API.logIn(email, pwd).then(admin => {
    //   setAuthUser(admin);
    //   handleClose();
    // })
    //   .catch(err => {
    //     setAuthErr(err);
    //   });
  };
  const logout = () => {
    // API.logOut().then(() => {
    //   setAuthUser(undefined);
    //   setAuthErr(undefined);
    // });
  };


  //value for AuthenticationContext
  // let authObject = {
  //   authUser: authUser,
  //   authErr: authErr,
  //   onLogin: login,
  //   onLogout: logout
  // };

  let authObject = {
    authUser: { name: 'Luca' },
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
              <Col lg={2} />
              <Col>
                <Routes>

                  <Route path='/' element={<AppLayout />}>
                    <Route path='/hikeform' element={<HikeForm />} />
                  </Route>



                  <Route path='*' element={<DefaultRoute />} />

                </Routes>
              </Col>
              <Col lg={2} />
            </Row>
          </Container>
        </BrowserRouter>
      </AuthenticationContext.Provider>
    </>
  );
}

export default App;

