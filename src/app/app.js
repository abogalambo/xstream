import './app.css';
import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  render() {
    return (
      <div id="app"> Dummy App </div>
    );
  }
}

const wrapper = document.getElementById("react-root");
ReactDOM.render(<App />, wrapper);