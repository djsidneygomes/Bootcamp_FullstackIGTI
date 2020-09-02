import React from 'react';
import ReadOnlyInput from './components/ReadOnlyInput';
import { getCalculationsFrom } from './helpers/calculations';
import DoubleButton from './components/DoubleButton';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      number: 1,

      calculations: {
        square: 1,
        squareRoot: 1,
        fatorial: 1,
      },
    };
  }

  componentDidUpdate(_, previousState) {
    const { number: oldNumber } = previousState;
    const { number: newNumber } = this.state;

    if (oldNumber !== newNumber) {
      const calculations = getCalculationsFrom(this.state.number);
      this.setState({ calculations });
    }
  }

  handleInputChange = (event) => {
    const newNumber = Number(event.target.value);
    this.setState({ number: newNumber });

    // this.setState({ number: newNumber }, () => {
    //   const calculations = getCalculationsFrom(this.state.number);
    //   this.setState({ calculations });
    // });
  };

  handleDoubleButtonClick = () => {
    console.log('handleDoubleButtonClick de App.js');
    const newNumber = this.state.number * 2;
    this.setState({ number: newNumber });
  };

  render() {
    const { number, calculations } = this.state;
    const { square, squareRoot, fatorial } = calculations;

    return (
      <div>
        <h1>React Calculator</h1>

        <label>
          <span>Número: </span>
          <input
            type='number'
            value={number}
            onChange={this.handleInputChange}
          />
        </label>

        <br />
        <br />

        <ReadOnlyInput description='Quadrado: ' value={square} />
        <ReadOnlyInput description='Raiz quadrada: ' value={squareRoot} />
        <ReadOnlyInput description='Fatorial: ' value={fatorial} />

        <br />

        <DoubleButton onButtonClick={this.handleDoubleButtonClick} />
      </div>
    );
  }
}
