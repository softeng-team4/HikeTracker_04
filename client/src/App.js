import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout, DefaultRoute } from './components/View';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<AppLayout />}></Route>



          <Route path='*' element={<DefaultRoute />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

