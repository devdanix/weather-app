import React, { Component } from "react";

import "./App.css";
import { ForecastList } from "./components/ForecastList";

class App extends Component {
  state = {
    data: [],
    city: "",
    fetchError: ""
  };

  // Handle fetch errors
  handleErrors = response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  // Get forecast from API
  getForecast = () => {
    // Check if city name has been populated
    if (this.state.city === "") {

      this.setState({
        data: [],
        fetchError: ""
      });
      return;
    }

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&APPID=${API_KEY}&units=metric`)
      .then(this.handleErrors)
      .then(result => result.json())
      .then(result => {
        this.setState({
          data: result
        });
      })

      .catch(error => this.setState({ fetchError: error }));
  };

  // Set state on change city input
  onFieldChange = event => {
    const fieldValue = event.target.value;
    this.setState({ city: fieldValue });
  };

  render() {
    let forecast, error;

    //Check if data array is empty
    if (this.state.data.length === 0) {
      forecast = "";
      error = this.state.fetchError.message;
    } else {
      // If not empty show forecast list
      forecast = <ForecastList forecasts={this.state.data} />;
    }

    return (
      <div className="container">
        <div className="form">
          <label>City Name</label>
          <input
            type="text"
            className="form-input-field"
            placeholder=""
            onChange={this.onFieldChange}
            autoComplete="off"
            required
          />
          <small className="form-text-small">
            Insert the city name you want to get the weather information for.
          </small>
        </div>

        <button
          className="btn btn-primary mt-20"
          type="submit"
          onClick={this.getForecast}
        >
          Get Weather
        </button>
        <p />
        <hr />

        <div className="row">{forecast}</div>

        <p>{error}</p>
      </div>
    );
  }
}

export default App;
