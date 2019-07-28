import React, { Component } from "react";
import Counter from '../counter'
import styles from './app.css';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Counter />
      </div>
    );
  }
}

export default App
