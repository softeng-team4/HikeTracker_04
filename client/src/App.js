import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout, DefaultRoute } from './components/View';
import { useEffect, useState } from 'react';
// import API from './API.js'
import NavBar from './components/NavBar';
import AuthenticationContext from './components/AuthenticationContext';
import { Container } from 'react-bootstrap';


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
          <Routes>

            <Route path='/' element={<AppLayout />}></Route>



            <Route path='*' element={<DefaultRoute />} />

          </Routes>
        </BrowserRouter>
      </AuthenticationContext.Provider>
    </>
  );
}

export default App;

