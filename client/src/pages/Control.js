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

  //gets all users from the database and sets them to the local usersList
  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUsersList(response.data);
    });
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
        <Button onClick={clearUsers}> CLEAR USERS IN DB </Button>
      </div>
    </div>
  );
}

export default Control;
