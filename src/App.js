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
      alert("Please insert a city name to check and try again.");
      this.setState({
        data: [],
        fetchError: ""
      });
      return;
    }

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        this.state.city +
        "&APPID=5eef0272a2043743b81829bf57ded1e3&units=metric"
    )
      .then(this.handleErrors)
      .then(result => result.json())
      .then(result => {
        this.setState({
          data: result
        });
      })
      //.catch(error => console.log(error));
      .catch(error => this.setState({ fetchError: error }));
  };

  // async componentDidMount() {
  //   try {
  //     const response = await fetch(
  //       "https://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=5eef0272a2043743b81829bf57ded1e3"
  //     );
  //     const json = await response.json();
  //     this.setState({ data: json });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
      <div className="container mt-4">
        <div className="form-group">
          <label>City Name</label>
          <input
            type="text"
            className="form-control col-md-6"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder=""
            onChange={this.onFieldChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Insert the city name you want to get the weather information for.
          </small>
        </div>

        <button className="btn btn-primary" onClick={this.getForecast}>
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
