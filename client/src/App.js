import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AddNewHike, AddNewHut, AddNewPark, AppLayout, BrowserHikes, DefaultRoute, ModifyHikeByAuthor } from './components/View';
import { useEffect, useState } from 'react';
import API from './API.js'
import NavBar from './components/NavBar';
import AuthenticationContext from './components/AuthenticationContext';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { LoginForm } from './components/LoginComponents';
import { SigninForm } from './components/SigninComponents';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { HikeForm } from './components/HikeForm';
import {BrowserHuts} from './components/BrowserHuts'

function App() {
  //states of authentication of an Admin
  const [authUser, setAuthUser] = useState(undefined);
  const [authErr, setAuthErr] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState('');

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setCurrentUser(currentUser);
      if (currentUser) {
        try {
          if (currentUser.emailVerified) {
            const userInfo = await API.getUser(currentUser.email);
            setAuthUser(userInfo);
          }
        } catch (err) {
          setAuthErr(err);
        }
      }
    })
  }, []);

  //login and logut functions
  const login = async (email, password) => {
    try {
      const user = await API.logIn(email, password);
      setAuthUser(user);
      setAuthErr(undefined);
      // setMessage({ msg: 'Hello ' + authUser.role + ',' + authUser.firstName, type: 'success' })
    } catch (err) {
      setAuthErr(err);
      setAuthUser(undefined);
      console.log(err);
      // setMessage({ msg: err, type: 'danger' });
      throw (err);
    }
  }
  // console.log(authUser.firstName)
  const logout = async () => {
    try {
      await API.logOut();
      setAuthUser(undefined);
      setAuthErr(undefined);
    } catch (err) {
      console.log(err);
    }
  }

  const signup = async (email, password, firstName, lastName, role) => {
    try {
      const user = await API.signUp(email, password, firstName, lastName, role);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }


  //value for AuthenticationContext
  let authObject = {
    authUser: authUser,
    authErr: authErr,
    onLogin: login,
    onLogout: logout
  };
  // console.log(authUser.role.toLowerCase()==='local guide')

  const addNewHike = async (ascent, city, country, description, difficulty, endPoint, expectedTime,
    length, referencePoint, region, title, startPoint) => {
    try {
      await API.addNewHike(ascent, city, country, description, difficulty, endPoint, expectedTime,
        length, referencePoint, region, title, startPoint, authUser.email);
    } catch (e) {
      console.log(e);
      throw (e);
    }
  }

  const addNewHut = async (hut) => {
    console.log("Adding new hut!");
    try {
      await API.addNewHut(hut);
    } catch (e) {
      console.log(e);
      throw (e);
    }
  };

  const addNewParkingLot = async (parkingLot) => {
    console.log("Adding new parking lot!");
    try {
      await API.addNewParkingLot(parkingLot);
    } catch (e) {
      console.log(e);
      throw (e);
    }
  };

  return (
    <>
      <AuthenticationContext.Provider value={authObject}>
        {/* {message && <Row>
                    <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
                  </Row>} */}
        <BrowserRouter>

          <Routes>

            <Route path='/' element={<AppLayout onLogOut={logout} loggedIn={login} />} >
              <Route index element={<BrowserHikes onLogOut={logout} loggedIn={login} />}></Route>
              <Route path='login' element={authUser ? <Navigate replace to='/' /> : <LoginForm login={login} />} />
              <Route path='signup' element={<SigninForm signup={signup} />}></Route>
              {/* here are the routes with local guide */}
              <Route path='hikeform' element={authUser ? (authUser.role.toLowerCase() === 'local guide') ? <AddNewHike addNewHike={addNewHike} /> : <Navigate to='/' /> : ''} />
              <Route path='newPark' element={authUser ? (authUser.role.toLowerCase() === 'local guide') ? <AddNewPark addNewParkingLot={addNewParkingLot} /> : <Navigate to='/' /> : ''} />
              <Route path='newHut' element={authUser ? (authUser.role.toLowerCase() === 'local guide') ? <AddNewHut addNewHut={addNewHut} /> : <Navigate to='/' /> : ''} />
              <Route path='modifyHike' element={authUser ? (authUser.role.toLowerCase() === 'local guide') ? <ModifyHikeByAuthor addNewHut={addNewHut} /> : <Navigate to='/' /> : ''} />
              <Route path='huts' element={authUser ? (authUser.role.toLowerCase() === 'local guide' || authUser.role.toLowerCase() === 'hiker') ? <BrowserHuts  /> : <Navigate to='/' /> : ''} />
              
              <Route></Route>
            </Route>

            <Route path='*' element={<DefaultRoute />} />

          </Routes>

        </BrowserRouter>
      </AuthenticationContext.Provider>
    </>
  );
}

export default App;

