import { useState, useMemo } from "react";
import styled from "styled-components";
import "./App.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import SignInSide from "./pages/sign-in";
import SignUp from "./pages/sign-up";

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

function App() {
  const [VaccineStatus, setVaccineStatus] = useState("non");
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passport, setPassport] = useState("");

  const [usersList, setUsersList] = useState([]);

  const options = useMemo(() => countryList().getData(), []);

  const addUser = () => {
    Axios.post("http://localhost:3001/create", {
      email: email,
      password: password,
      name: name,
      VaccineStatus: VaccineStatus,
      passport: passport,
    }).then(() => {
      setUsersList([
        ...usersList,
        {
          email: email,
          password: password,
          name: name,
          VaccineStatus: VaccineStatus,
          passport: passport,
        },
      ]);
      console.log("success");
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUsersList(response.data);
    });
  };

  const changeHandler = (value) => {
    setValue(value);
    setPassport(value.label);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/sign-in' element={<SignInSide />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='*' element={<Error />} />
      </Routes>

      <div className='App'>
        <div className='information'>
          <label>Email:</label>
          <input
            type='text'
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label>Password:</label>
          <input
            type='text'
            onChange={(event) => setPassword(event.target.value)}
          />
          <label>Name:</label>
          <input
            type='text'
            onChange={(event) => setName(event.target.value)}
          />
          <label>Vaccine Status:</label>
          <select
            value={VaccineStatus}
            onChange={(event) => setVaccineStatus(event.target.value)}
          >
            <option name='Vaccinated'> Vaccinated </option>
            <option name='Boosted'> Boosted </option>
            <option name='Unvaccinated'> Unvaccinated </option>
          </select>
          <label>Passport Country:</label>
          <div className='Select'>
            <Select options={options} value={value} onChange={changeHandler} />
          </div>
          <Button onClick={addUser}> SUBMIT </Button>

          <Button onClick={getUsers}> SHOW USERS IN DB </Button>

          {usersList.map((val, key) => {
            return (
              <div className='users'>
                <h3> Name: {val.name} </h3>
                <h3> Email: {val.email} </h3>
                <h3> Password: {val.password} </h3>
                <h3> VaccineStatus: {val.vaccine_status} </h3>
                <h3> Passport Country: {val.passport} </h3>
              </div>
            );
          })}
        </div>
      </div>
    </Router>
  );
}

export default App;
