import React, { useState, useEffect } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import styles from "./SelectCountry.module.css";
import axios from "axios";

const SelectCountry = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountry();
  }, []);

  function getCountry() {
    axios
      .get("https://covid.mathdro.id/api/countries")
      .then((response) => {
        let { countries } = response.data;
        countries = countries.map((item) => item.name);
        setCountries(countries);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect onChange={(event) => handleCountryChange(event)}>
        <option value="">Negara</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default SelectCountry;
