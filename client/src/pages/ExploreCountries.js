import React from "react";
import { useState } from "react";
import styled from "styled-components";
import "../App.css";
import Axios from "axios";
import { Grid } from "@material-ui/core";

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

function ExploreCountries() {
    const [countries, setCountriesList] = useState([]);
    const [countriesREQ, setCountriesListREQ] = useState([]);
    const [countriesNOREQ, setCountriesListNOREQ] = useState([]);
    const [VaccineStatus, setVaccineStatus] = useState("NO");
    const [Testing, setTesting] = useState("NO");
    const [Quarantine, setQuarantine] = useState("NO");

    const [T, setT] = useState(0);
    const [V, setV] = useState(0);
    const [Q, setQ] = useState(0);

    const searchCountries = () => {
        setup()
        Axios.post("http://localhost:3001/search-countries", {
            V: V,
            T: T,
            Q: Q
        }).then((response) => {
            console.log(response)
            setCountriesList(response.data);
        });
    };


    const setup = () => {
        const VV = 0;
        const TT = 0;
        const VVV = 1;
        const TTT = 1;
        const QQ = 0;
        const QQQ = 1;

        if (VaccineStatus == "NO") {
            setV(VV)
        }
        if (VaccineStatus == "YES") {
            setV(VVV)
        }
        if (Testing == "NO") {
            setT(TT)
        }
        if (Testing == "YES") {
            setT(TTT)
        }
        if (Quarantine == "NO") {
            setQ(QQ)
        }
        if (Quarantine == "YES") {
            setQ(QQQ)
        }


    }




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
                    <label>Testing Required:</label>
                    <select
                        value={Testing}
                        onChange={(event) => setTesting(event.target.value)}
                    >
                        <option name='YES'> YES </option>
                        <option name='NO'> NO </option>
                    </select>
                </Grid>

                <Grid item xs={12}>
                    <label>Quarantine Required:</label>
                    <select
                        value={Quarantine}
                        onChange={(event) => setQuarantine(event.target.value)}
                    >
                        <option name='YES'> YES </option>
                        <option name='NO'> NO </option>
                    </select>
                </Grid>

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

                <Button onClick={() => searchCountries()}> SHOW COUNTREIS </Button>


            </div>
        </div>
    );
}

export default ExploreCountries;
