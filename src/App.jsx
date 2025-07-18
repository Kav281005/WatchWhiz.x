// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
//   // import Home from './pages/home';
// import Watchlist from './pages/Watchlist';
// //  import Dashboard from './pages/Dashboard';
//  import MovieDetail from './pages/MovieDetail';
// import HomeDashboard from './pages/HomeDashboard';
// import Login from './pages/Login';
// import Register from './pages/Register';

// function App() {
//   return (
    
//     <Router>
//       <div className="bg-black text-white min-h-screen">
//       <Navbar />
//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
//         <Route path="/" element={<HomeDashboard />} />
//          <Route path="/movie/:id" element={<MovieDetail />} /> 
//          <Route path="/watchlist" element={<Watchlist />} />
//          <Route path="/login" element={<Login />} />
//          <Route path="/register" element={<Register />} />
//         {/* <Route path="/Dashboard" element={<Dashboard />} />  */}
//       </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// App.jsx
// import React from 'react';
import {  Routes,Route , useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeDashboard from './pages/HomeDashboard';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';
 import Login from './pages/Login';
import Register from './pages/Register';

import Profile from './pages/profile';
// const location = useLocation();

// const noNavRoutes = ['/login', '/register'];  // add paths where Navbar should be hidden
//   const hideNavbar = noNavRoutes.includes(location.pathname);
export default function App() {
   const location = useLocation();
   const hideNav = ['/login', '/register'].includes(location.pathname);


  return (
    <>
    {!hideNav && <Navbar />}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}