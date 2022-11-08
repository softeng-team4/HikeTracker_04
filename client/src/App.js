import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout, DefaultRoute } from './components/View';
import { HikeForm } from './components/HikeForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<AppLayout />}>
            <Route path='/hikeform' element={<HikeForm/>}/>
            <Route path='*' element={<DefaultRoute />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

