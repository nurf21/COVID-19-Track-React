import React from "react";
import axios from "axios";
import styles from "./Home.module.css";
import imageHeader from "../../images/head 3.png";
import Typography from "@material-ui/core/Typography";
import SelectCountry from "../../components/SelectCountry/SelectCountry";
import Cards from "../../components/Cards/Cards";

class Home extends React.Component {
  state = {
    data: {},
  };

  componentDidMount() {
    this.getData();
  }

  getData = (country) => {
    let setUrl = "https://covid19.mathdro.id/api";
    setUrl = country ? `${setUrl}/countries/${country}` : setUrl;
    axios
      .get(setUrl)
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCountryChange = (event) => {
    let country = event.target.value;
    this.getData(country);
    const setCountry = country ? country : "Global";
    this.props.history.push({
      search: `?country=${setCountry}`,
    });
  };

  render() {
    const { data } = this.state;
    const lastUpdate = new Date(data.lastUpdate).toDateString();
    return (
      <div className={styles.container}>
        <img className={styles.image} src={imageHeader} alt="covid-19" />
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Terakhir Update : {lastUpdate}
        </Typography>
        <SelectCountry handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
      </div>
    );
  }
}

export default Home;
