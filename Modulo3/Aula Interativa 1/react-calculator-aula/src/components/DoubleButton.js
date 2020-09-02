import React, { Component } from 'react';

export default class DoubleButton extends Component {
  handleButtonClick = () => {
    console.log('Click em DoubleButton');
    this.props.onButtonClick();
  };

  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick}>Dobrar valor do input</button>
      </div>
    );
  }
}
