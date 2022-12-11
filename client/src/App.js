import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AddNewHike, AddNewHut, AddNewPark, AppLayout, BrowserHikes, DefaultRoute, ManagerPage, ModifyHikeByAuthor, UserProfile } from './components/View';
import { useEffect, useState } from 'react';
import API from './API.js'
import AuthenticationContext from './components/AuthenticationContext';
import { LoginForm } from './components/AuthComponents/LoginComponents';
import { SignupForm } from './components/AuthComponents/SignupComponents';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { BrowserHuts } from './components/BrowerHutComponent/BrowserHuts'
import { UpdateCondition } from './components/UpdateCondition';
import HandleModifyPage from './components/ModifyHikeComponents/HandleModifyPage';
import StaticHikeInfo from './components/ModifyHikeComponents/StaticHikeInfo';

function App() {
  //states of authentication of an Admin
  const [authUser, setAuthUser] = useState(undefined);
  const [authErr, setAuthErr] = useState(undefined);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
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
  }, [auth]);

  //login and logut functions
  const login = async (email, password) => {
    try {
      const user = await API.logIn(email, password);
      setAuthUser(user);
      setAuthErr(undefined);
    } catch (err) {
      setAuthErr(err);
      setAuthUser(undefined);
      console.log(err);
      throw (err);
    }
  }
  const logout = async () => {
    try {
      await API.logOut();
      setAuthUser(undefined);
      setAuthErr(undefined);
    } catch (err) {
      console.log(err);
    }
  }

  // function to trigger update of authUser data
  const updateUserData = async () => {
    const userData = await API.getUser(authUser.email);
    setAuthUser(userData);
    return userData;
  };

  const signup = async (email, password, firstName, lastName, role) => {
    try {
      await API.signUp(email, password, firstName, lastName, role);
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
    onLogout: logout,
    onUpdateUserData: updateUserData
  };

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

            <Route path='/' element={<AppLayout />} >
              <Route index element={<BrowserHikes />}></Route>
              <Route path='login' element={authUser ? <Navigate replace to='/' /> : <LoginForm login={login} />} />
              <Route path='signup' element={<SignupForm signup={signup} />}></Route>
              {/* here are the routes with authenticated */}
              {authUser && <Route path={`/profile/${authUser.firstName.toLowerCase().replace(' ', '_')}_${authUser.lastName.toLowerCase().replace(' ', '_')}`} element={<UserProfile />} />}
              {/* here are the routes with local guide */}
              <Route path='hikeform' element={authUser ? (authUser.role.toLowerCase() === 'local guide') ? <AddNewHike addNewHike={addNewHike} /> : <Navigate to='/' /> : ''} />
              <Route path='newPark' element={authUser ? (authUser.role.toLowerCase() === 'local guide') ? <AddNewPark addNewParkingLot={addNewParkingLot} /> : <Navigate to='/' /> : ''} />
              <Route path='newHut' element={authUser ? (authUser.role.toLowerCase() === 'local guide') ? <AddNewHut addNewHut={addNewHut} /> : <Navigate to='/' /> : ''} />
              <Route path='myHikeList' element={authUser ? (authUser.role.toLowerCase() === 'local guide') ? <ModifyHikeByAuthor /> : <Navigate to='/' /> : ''} />
              <Route path='modifyHike' element={authUser ? (authUser.role.toLowerCase() === 'local guide') ? <StaticHikeInfo /> : <Navigate to='/' /> : ''} />
              <Route path='huts' element={authUser ? (authUser.role.toLowerCase() === 'local guide' || authUser.role.toLowerCase() === 'hiker') ? <BrowserHuts /> : <Navigate to='/' /> : ''} />

              <Route path='hikeCondition' element={authUser ? (authUser.role.toLowerCase() === 'hut worker') ? <UpdateCondition /> : <Navigate to='/' /> : ''} />
              {/* here are the routes with manager */}
              <Route path='manager' element={authUser ? (authUser.role.toLowerCase() === 'manager') ? <ManagerPage /> : <Navigate to='/' /> : ''} />
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

