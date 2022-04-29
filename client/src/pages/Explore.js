import React from "react";
import { useState } from "react";
import styled from "styled-components";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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


function Explore() {
    let navigate = useNavigate();
    return (


        <div className='App'>

            <div className='information'>

                <Button onClick={() => { navigate('/ExploreAirlines') }}> EXPLORE BY AIRLINES </Button>
                <Button onClick={() => { navigate('/ExploreCountries') }}> EXPLORE BY COUNTRIES </Button>
            </div>
        </div>
    );
}

export default Explore;
