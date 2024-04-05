import "./styles.css";

import React, { useEffect, useState } from "react";

export default function App() {
  const [countryData, setCountryData] = useState([]);
  const [countrySelected, setcountrySelected] = useState("");
  const [stateData, setStateData] = useState([]);
  const [stateSelected, setStateSelected] = useState("");
  const [cityData, setCityData] = useState([]);
  const [citySelected, setCitySelected] = useState("");

  function handleCountryChange(e) {
    setcountrySelected(e.target.value);
  }

  function handleCityChange(e) {
    setCitySelected(e.target.value);
  }
  function handleStateChange(e) {
    setStateSelected(e.target.value);
  }

  async function performCountryApi() {
    try {
      let data = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      let res = await data.json();
      setCountryData(res);
    } catch (e) {
      console.error(e);
    }
  }

  async function performStateApi() {
    if (countrySelected) {
      try {
        let data = await fetch(
          'https://crio-location-selector.onrender.com/country=${countrySelected}/states'
        );
        let res = await data.json();
        setStateData(res);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function performCityApi() {
    if (countrySelected && stateSelected) {
      try {
        let data = await fetch(
          'https://crio-location-selector.onrender.com/country=${countrySelected}/state=${stateSelected}/cities'
        );
        let res = await data.json();
        setCityData(res);
      } catch (e) {
        console.log(e);
      }
    }
  }
  useEffect(() => {
    performCityApi();
    // setShowContent(true)
  }, [stateSelected]);

  useEffect(() => {
    performCountryApi();
  }, []);

  useEffect(() => {
    performStateApi();
  }, [countrySelected]);
  return (
    <div className="App">
      <h1>Select Location</h1>

      <div>
        <select
          name=""
          id=""
          onChange={handleCountryChange}
          value={countrySelected}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countryData.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>

        <select
          name=""
          id=""
          onChange={handleStateChange}
          value={stateSelected}
          disabled={!countrySelected}
        >
          <option value="" disabled>
            Select State
          </option>
          {stateData.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>

        <select
          name=""
          id=""
          onChange={handleCityChange}
          value={citySelected}
          disabled={!stateSelected}
        >
          <option value="" disabled>
            Select City
          </option>
          {cityData.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        {citySelected && (
          <div>
            <span className="main">You selected </span>
            <span>
              <span className="city">{citySelected}</span>
              <span className="country">
                , {stateSelected}, {countrySelected}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}