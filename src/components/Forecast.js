/*
 * Description: Forcast component used to show single forcast card and info
 * Used in:     ForcastList
 * Author:      Daniele Loi
 */

import React, { Component } from "react";

export class Forecast extends Component {
  state = {
    cardClass: "card-body normal",
    showLabel: "Show More",
    additionalInfo: "hide-additional-info"
  };

  // Get day name from single forecast timestamp
  getDayName = timestamp => {
    // Set new date with timestamp from parameter
    const date = new Date(timestamp);

    // Set day names array
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Return name in array in getDay() position
    return daysOfWeek[date.getDay()];
  };

  // Get time from single forecasr timestamp
  getDayTime = timestamp => {
    // Set new date with timestamp from parameter
    const date = new Date(timestamp);

    // Return parsed timestamp
    return date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  toggleInfo = e => {
    const target = e.target.content;

    //target.toggleClass("card-body show");
    if (this.state.cardClass === "card-body show") {
      this.setState({
        cardClass: "card-body normal",
        showLabel: "Show More",
        additionalInfo: "hide-additional-info"
      });
    } else {
      this.setState({
        cardClass: "card-body show",
        showLabel: "Show Less",
        additionalInfo: "show-additional-info"
      });
    }
  };

  render() {
    // Get props in variables
    const icon = this.props.weather[0].icon;
    const date = this.props.dt_txt;
    const temp = this.props.temp;
    const tempMin = this.props.main.temp_min;
    const tempMax = this.props.main.temp_max;
    const pressure = this.props.main.pressure;
    const humidity = this.props.main.humidity;

    return (
      <div className="col-sm-3">
        <div className="card text-center">
          <div className={this.state.cardClass}>
            <h5 className="card-title">{this.getDayName(date)}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {this.getDayTime(date)}
            </h6>
            <img
              src={"https://openweathermap.org/img/wn/" + icon + "@2x.png"}
              alt=""
            />
            <p>{Math.ceil(temp)}</p>
            <button className="btn btn-link" onClick={this.toggleInfo}>
              {this.state.showLabel}
            </button>
            <p />
            <div className={this.state.additionalInfo}>
              <div style={showMoreStyle}>
                <p className="text-left">Temp Min :</p>
                <p className="text-right" style={minTempStyle}>
                  {tempMin} °C
                </p>
              </div>
              <div style={showMoreStyle}>
                <p className="text-left">Temp Max :</p>
                <p className="text-right" style={maxTempStyle}>
                  {tempMax} °C
                </p>
              </div>
              <div style={showMoreStyle}>
                <p className="text-left">Pressure :</p>
                <p className="text-right">{pressure} hPa</p>
              </div>
              <div style={showMoreStyle}>
                <p className="text-left">Humidity :</p>
                <p className="text-right">{humidity} %</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const showMoreStyle = {
  display: "flex",
  justifyContent: "space-between",
  color: "#AAAAAA"
};

const minTempStyle = {
  color: "#0000FF"
};

const maxTempStyle = {
  color: "#FF0000"
};

export default Forecast;
