// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from './components/topbar/TopBar';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Settings from './pages/settings/Settings';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='write' element={user ? <Write /> : <Register />} />
        <Route path='/post/:postId' element={<Single />} />
        <Route path='settings' element={user ? <Settings /> : <Register />} />
        <Route path='register' element={user ? <Home /> : <Register />} />
        <Route path='login' element={user ? <Home /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
