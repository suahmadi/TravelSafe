import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import SignInSide from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Control from "./pages/Control";
import Explore from "./pages/Explore";
import ExploreAirlines from "./pages/ExploreAirlines";
import ExploreCountries from "./pages/ExploreCountries";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/sign-in' element={<SignInSide />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/Control' element={<Control />} />
        <Route path='/Explore' element={<Explore />} />
        <Route path='/ExploreAirlines' element={<ExploreAirlines />} />
        <Route path='/ExploreCountries' element={<ExploreCountries />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
