import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import "../App.css";
import Grid from "@mui/material/Grid";


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

function ExploreAirlines() {

    const [airlines, setAirlines] = useState([]);
    const [VaccineStatus, setVaccineStatus] = useState("NO");
    const [Mask, setMask] = useState("NO");
    const [M, setM] = useState(0);
    const [V, setV] = useState(0);

    const setup = () => {
        const VV = 0;
        const MM = 0;
        const VVV = 1;
        const MMM = 1;

        if (VaccineStatus == "NO") {
            setV(VV)
        }
        if (VaccineStatus == "YES") {
            setV(VVV)
        }
        if (Mask == "NO") {
            setM(MM)
        }
        if (Mask == "YES") {
            setM(MMM)
        }

    }

    const show = () => {
        console.log(V)
        console.log(T)
        console.log(Q)
    };

    const searchAirlines = () => {
        setup()
        Axios.post("http://localhost:3001/search-airlines", {
            V: V,
            M: M
        }).then((response) => {
            console.log(response)
            setAirlines(response.data);
        });
    };


    return (
        <div className='App'>
            <div className='information'>

                <Grid item xs={12}>
                    <label>Vaccine Required:</label>
                    <select
                        value={VaccineStatus}
                        onChange={(event) => setVaccineStatus(event.target.value)}
                    >
                        <option name='YES'> YES </option>
                        <option name='NO'> NO </option>
                    </select>
                </Grid>

                <Grid item xs={12}>
                    <label>Mask Required:</label>
                    <select
                        value={Mask}
                        onChange={(event) => setMask(event.target.value)}
                    >
                        <option name='YES'> YES </option>
                        <option name='NO'> NO </option>
                    </select>
                </Grid>
                <Button onClick={() => searchAirlines()}> SHOW AIRLINES </Button>

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

            </div>
        </div>
    );
}

export default ExploreAirlines;
