/*
 * Description: ForcastList component used to show forcast list components
 * Used in:     App
 * Author:      Daniele Loi
 */

import React, { Component } from "react";
import Forecast from "./Forecast";

export class ForecastList extends Component {
  render() {
    console.log(this.props.forecasts);
    return this.props.forecasts.list.map((forecast, index) => {
      return (
        <Forecast
          key={index}
          cod={forecast.cod}
          dt_txt={forecast.dt_txt}
          weather={forecast.weather}
          temp={forecast.main.temp}
          main={forecast.main}
        />
      );
    });
  }
}

export default ForecastList;
