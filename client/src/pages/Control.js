import React from "react";
import { useState } from "react";
import styled from "styled-components";
import "../App.css";

import Axios from "axios";

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

function Control() {
  const [usersList, setUsersList] = useState([]);
  const [countries, setCountriesList] = useState([]);
  const [countriesREQ, setCountriesListREQ] = useState([]);
  const [countriesNOREQ, setCountriesListNOREQ] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [airlinesREQ, setAirlinesREQ] = useState([]);
  const [airlinesNOREQ, setAirlinesNOREQ] = useState([]);


  //gets all users from the database and sets them to the local usersList
  const getUsers = () => {
    if (Object.keys(usersList).length === 0) {
      Axios.get("http://localhost:3001/users").then((response) => {
        setUsersList(response.data);
        setAirlines([]);
        setCountriesListNOREQ([]);
        setCountriesListREQ([]);
        setCountriesList([]);
      });
    } else {
      setUsersList([]);
    }
  };

  const getAirlines = () => {
    if (Object.keys(airlines).length === 0) {
      Axios.get("http://localhost:3001/list-all-airlines").then((response) => {
        setAirlines(response.data);
        setCountriesListNOREQ([]);
        setCountriesListREQ([]);
        setCountriesList([]);
        setUsersList([]);
      });
    } else {
      setAirlines([]);
    }
  };


  const getAirlinesREQ = () => {
    if (Object.keys(airlinesREQ).length === 0) {
      Axios.get("http://localhost:3001/list-req-airline").then((response) => {
        setAirlinesREQ(response.data)
        setAirlines([]);
        setCountriesListNOREQ([]);
        setCountriesListREQ([]);
        setCountriesList([]);
        setUsersList([]);
      });
    } else {
      setAirlinesREQ([]);
    }
  };

  const getAirlinesNOREQ = () => {
    if (Object.keys(airlinesNOREQ).length === 0) {
      Axios.get("http://localhost:3001/list-noreq-airline").then((response) => {
        setAirlinesNOREQ(response.data)
        setAirlinesREQ([]);
        setAirlines([]);
        setCountriesListNOREQ([]);
        setCountriesListREQ([]);
        setCountriesList([]);
        setUsersList([]);
      });
    } else {
      setAirlinesNOREQ([]);
    }
  };

  const getCountries = () => {
    if (Object.keys(countries).length === 0) {
      Axios.get("http://localhost:3001/list-all").then((response) => {
        setCountriesList(response.data);
        setCountriesListNOREQ([]);
        setCountriesListREQ([]);
        setAirlines([]);
        setUsersList([]);
      });
    }
    else {
      setCountriesList([]);
    }
  };

  const getCountriesREQ = () => {
    if (Object.keys(countriesREQ).length === 0) {

      Axios.get("http://localhost:3001/list-req").then((response) => {
        setCountriesListREQ(response.data);
        setUsersList([]);
        setCountriesListNOREQ([]);
        setCountriesList([]);
        setAirlines([]);

      });
    } else {
      setCountriesListREQ([]);
    }

  };

  const getCountriesNOREQ = () => {
    if (Object.keys(countriesNOREQ).length === 0) {
      Axios.get("http://localhost:3001/list-noreq").then((response) => {
        setCountriesListNOREQ(response.data);
        setCountriesListREQ([]);
        setCountriesList([]);
        setAirlines([]);

        setUsersList([]);
      });
    } else {
      setCountriesListNOREQ([]);
    }
  };

  //remove all users from the database and resets the local usersList
  const clearUsers = () => {
    Axios.get("http://localhost:3001/clear-users").then((response) => {
      setUsersList([]);
    });
  };

  return (
    <div className='App'>
      <div className='information'>
        <Button onClick={getUsers}> SHOW USERS IN DB </Button>
        {usersList.map((val, _key) => {
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
        <Button onClick={getCountriesREQ}> SHOW COUNTRIES THAT REQUIRE VACCINE IN DB </Button>
        {countriesREQ.map((val, _key) => {
          if (val.vaccine_required == 1) {
            val.vaccine_required = "YES"
          } else if (val.vaccine_required == 0) {
            val.vaccine_required = "NO"
          }
          if (val.testing_required == 1) {
            val.testing_required = "YES"
          } else if (val.testing_required == 0) {
            val.testing_required = "NO"
          }
          if (val.quarantine_required == 1) {
            val.quarantine_required = "YES"
          } else if (val.quarantine_required == 0) {
            val.quarantine_required = "NO"
          }
          return (
            <div className='users'>
              <h3> Country Name: {val.country_name} </h3>
              <h3> Vaccine Required: {val.vaccine_required} </h3>
              <h3> Testing Required: {val.testing_required} </h3>
              <h3> Risk Level: {val.risk_level} </h3>
              <h3> Quarantine Required: {val.quarantine_required} </h3>
            </div>
          );
        })}

        <Button onClick={getCountriesNOREQ}> SHOW COUNTRIES THAT DO NOT REQUIRE VACCINE IN DB </Button>
        {countriesNOREQ.map((val, _key) => {
          if (val.vaccine_required == 1) {
            val.vaccine_required = "YES"
          } else if (val.vaccine_required == 0) {
            val.vaccine_required = "NO"
          }
          if (val.testing_required == 1) {
            val.testing_required = "YES"
          } else if (val.testing_required == 0) {
            val.testing_required = "NO"
          }
          if (val.quarantine_required == 1) {
            val.quarantine_required = "YES"
          } else if (val.quarantine_required == 0) {
            val.quarantine_required = "NO"
          }
          return (
            <div className='users'>
              <h3> Country Name: {val.country_name} </h3>
              <h3> Vaccine Required: {val.vaccine_required} </h3>
              <h3> Testing Required: {val.testing_required} </h3>
              <h3> Risk Level: {val.risk_level} </h3>
              <h3> Quarantine Required: {val.quarantine_required} </h3>
            </div>
          );
        })}


        <Button onClick={getCountries}> SHOW ALL COUNTRIES IN DB </Button>
        {countries.map((val, _key) => {
          if (val.vaccine_required == 1) {
            val.vaccine_required = "YES"
          } else if (val.vaccine_required == 0) {
            val.vaccine_required = "NO"
          }
          if (val.testing_required == 1) {
            val.testing_required = "YES"
          } else if (val.testing_required == 0) {
            val.testing_required = "NO"
          }
          if (val.quarantine_required == 1) {
            val.quarantine_required = "YES"
          } else if (val.quarantine_required == 0) {
            val.quarantine_required = "NO"
          }
          return (
            <div className='users'>
              <h3> Country Name: {val.country_name} </h3>
              <h3> Vaccine Required: {val.vaccine_required} </h3>
              <h3> Testing Required: {val.testing_required} </h3>
              <h3> Risk Level: {val.risk_level} </h3>
              <h3> Quarantine Required: {val.quarantine_required} </h3>
            </div>
          );
        })}

        <Button onClick={getAirlinesREQ}> SHOW ALL AIRLINES THAT REQUIRE MASK AND VACCINE IN DB </Button>
        {airlinesREQ.map((val, _key) => {
          console.log(val.vaccine_required)
          if (val.mask_required == 1) {
            val.mask_required = "YES"
          } else if (val.mask_required == 0) {
            val.mask_required = "NO"
          }
          if (val.vaccine_required == 1) {
            val.vaccine_required = "YES"
          } else if (val.vaccine_required == 0) {
            val.vaccine_required = "NO"
          }
          return (
            <div className='users'>
              <h3> airline id: {val.airline_id} </h3>
              <h3> airline name: {val.airline_name} </h3>
              <h3> mask required: {val.mask_required} </h3>
              <h3> vaccine required: {val.vaccine_required} </h3>
            </div>
          );
        })}

        <Button onClick={getAirlinesNOREQ}> SHOW ALL AIRLINES THAT DON'T REQUIRE MASK AND VACCINE IN DB </Button>
        {airlinesNOREQ.map((val, _key) => {
          console.log(val.vaccine_required)
          if (val.mask_required == 1) {
            val.mask_required = "YES"
          } else if (val.mask_required == 0) {
            val.mask_required = "NO"
          }
          if (val.vaccine_required == 1) {
            val.vaccine_required = "YES"
          } else if (val.vaccine_required == 0) {
            val.vaccine_required = "NO"
          }
          return (
            <div className='users'>
              <h3> airline id: {val.airline_id} </h3>
              <h3> airline name: {val.airline_name} </h3>
              <h3> mask required: {val.mask_required} </h3>
              <h3> vaccine required: {val.vaccine_required} </h3>
            </div>
          );
        })}

        <Button onClick={getAirlines}> SHOW ALL AIRLINES IN DB </Button>
        {airlines.map((val, _key) => {
          console.log(val.vaccine_required)
          if (val.mask_required == 1) {
            val.mask_required = "YES"
          } else if (val.mask_required == 0) {
            val.mask_required = "NO"
          }
          if (val.vaccine_required == 1) {
            val.vaccine_required = "YES"
          } else if (val.vaccine_required == 0) {
            val.vaccine_required = "NO"
          }
          return (
            <div className='users'>
              <h3> airline id: {val.airline_id} </h3>
              <h3> airline name: {val.airline_name} </h3>
              <h3> mask required: {val.mask_required} </h3>
              <h3> vaccine required: {val.vaccine_required} </h3>
            </div>
          );
        })}

        <Button onClick={clearUsers}> CLEAR USERS IN DB </Button>
      </div>
    </div>
  );
}

export default Control;
