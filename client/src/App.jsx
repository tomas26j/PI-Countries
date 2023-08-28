import './App.css';
import {BrowserRouter, Route, Routes, Router} from 'react-router-dom';
import LandingPage from './components/landingpage/LandingPage.jsx';
import Home from './components/home/Home.jsx'
import Activity from './components/activity/Activity.jsx'
import Detail from './components/detail/Detail.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path= '/' element={<LandingPage/>} />
        <Route exact path= '/home' element={<Home/>} />
        <Route exact path= '/activities' element={<Activity/>} />
        <Route exact path= '/countries/:id' element={<Detail/>} />
      </Routes>
    </div>
  );
}

export default App;
