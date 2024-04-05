import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [countryData, setCountryData] = useState([]);
  const [countrySelected, setCountrySelected] = useState("");
  const [stateData, setStateData] = useState([]);
  const [stateSelected, setStateSelected] = useState("");
  const [cityData, setCityData] = useState([]);
  const [citySelected, setCitySelected] = useState("");

  function handleCountryChange(e) {
    setCountrySelected(e.target.value);
    setStateSelected(""); // Reset state and city when country changes
    setCitySelected("");
  }

  function handleCityChange(e) {
    setCitySelected(e.target.value);
  }

  function handleStateChange(e) {
    setStateSelected(e.target.value);
    setCitySelected(""); // Reset city when state changes
  }

  async function performCountryApi() {
    try {
      let data = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      let res = await data.json();
      setCountryData(res);
    } catch (e) {
      console.error("Error fetching countries:", e);
    }
  }

  async function performStateApi() {
    if (countrySelected) {
      try {
        let data = await fetch(
          `https://crio-location-selector.onrender.com/country=${countrySelected}/states`
        );
        let res = await data.json();
        setStateData(res);
      } catch (e) {
        console.error("Error fetching states:", e);
      }
    }
  }

  async function performCityApi() {
    if (countrySelected && stateSelected) {
      try {
        let data = await fetch(
          `https://crio-location-selector.onrender.com/country=${countrySelected}/state=${stateSelected}/cities`
        );
        let res = await data.json();
        setCityData(res);
      } catch (e) {
        console.error("Error fetching cities:", e);
      }
    }
  }

  useEffect(() => {
    performCountryApi();
  }, []);

  useEffect(() => {
    performStateApi();
  }, [countrySelected]);

  useEffect(() => {
    performCityApi();
  }, [stateSelected]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div>
        <select onChange={handleCountryChange} value={countrySelected}>
          <option value="" disabled>
            Select Country
          </option>
          {countryData.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>

        <select
          onChange={handleStateChange}
          value={stateSelected}
          disabled={!countrySelected}
        >
          <option value="" disabled>
            Select State
          </option>
          {Array.isArray(stateData) &&
            stateData.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
        </select>

        <select
          onChange={handleCityChange}
          value={citySelected}
          disabled={!stateSelected}
        >
          <option value="" disabled>
            Select City
          </option>
          {Array.isArray(cityData) &&
            cityData.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
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
