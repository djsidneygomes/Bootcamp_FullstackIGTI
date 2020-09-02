import React from "react";
import "./styles.css";
import Bar from "./Bar";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      bar1: 50,
      bar2: 50
    };
  }

  handleChangeBar1 = event => {
    const bar1 = +event.target.value;
    const bar2 = 100 - bar1;

    this.setState({ bar1, bar2 });
  };

  handleChangeBar2 = event => {
    const bar2 = +event.target.value;
    const bar1 = 100 - bar2;

    this.setState({ bar1, bar2 });
  };

  render() {
    const { bar1, bar2 } = this.state;

    return (
      <div>
        <div className="App">
          <h1>React barras</h1>
          <input
            type="number"
            placeholder="Barra 1"
            value={bar1}
            onChange={this.handleChangeBar1}
            min="0"
            max="100"
            step="1"
          />
          &nbsp;
          <input
            type="number"
            placeholder="Barra 1"
            value={bar2}
            onChange={this.handleChangeBar2}
            min="0"
            max="100"
            step="1"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Bar value={bar1} color="red" />
          <Bar value={bar2} color="green" />
        </div>
      </div>
    );
  }
}
