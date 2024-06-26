import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import RoomBooking from './components/RoomBooking';
import Locations from './components/Locations';
import NavBar from './components/NavBar';

/* To Be Modified. */
function App() {
  return (
    <BrowserRouter>
      {/* 
        Render the NavBar component before the routes definition with props navTitle as "Hillspot Palace".
      */}
      <NavBar navTitle="Hillspot Palace"></NavBar>
      <Routes>
        {/* 
          Add the routes as mentioned below:
            1. It should redirect to Locations component for default URL i.e. http://localhost:3000/.
            2. It should load RoomBooking component for /roomBooking/:locationName.
            3. It should redirect to Locations component for any wrong URL e.g. http://localhost:3000/wrongpage.
        */}
        <Route path='/' element={<Locations />}></Route>
        <Route path='/roomBooking/:locationName' element={<RoomBooking />}> </Route>
        <Route path='*' element={<Navigate replace to="/" />}></Route>

      </Routes>
    </BrowserRouter>
  );
}
export default App;
