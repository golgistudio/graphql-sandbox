import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Button from '../components/Button';

class FizzBuzz extends Component {
  constructor(props) {
    super(props);

    this.onBlurMaxValue = this.onBlurMaxValue.bind(this);
    this.onBlurFizz = this.onBlurFizz.bind(this);
    this.onBlurBuzz = this.onBlurBuzz.bind(this);
    this.onBlurTimeout = this.onBlurTimeout.bind(this);
    this.onClickRun = this.onClickRun.bind(this);
    this.onClickStop = this.onClickStop.bind(this);
    this.getOutput = this.getOutput.bind(this);

    this.output = [];
    this.timeoutId = -1;

    this.state = {
      max: 100,
      fizz: 3,
      buzz: 5,
      run: false,
      currentValue: 0,
      timeout: 200
    }
  }

  componentDidUpdate() {
    const { currentValue, max, run, fizz, buzz } = this.state;
    if (run) {
      const nextValue = currentValue + 1;
      if (currentValue > max) {
        if (this.timeoutId !== -1) {
          clearTimeout(this.timeoutId);
          this.timeoutId = -1;
        }
        this.setState({
          currentValue: 0,
          run: false,
        });
      } else {
        if (currentValue === 0) {
          this.output = [];
        }
        if (this.timeoutId === -1) {
          this.timeoutId = setTimeout(() => {
            const outputItem = this.getOutput(currentValue, fizz, buzz);
            this.output.push(outputItem);
            this.timeoutId = -1;
            this.setState({
              currentValue: nextValue
            });
          }, this.state.timeout);
        }
      }
    }
  }

  onBlurTimeout(evt) {
    evt.preventDefault();
    this.setState({
      timeout: evt.target.value
    });
  }

  onBlurMaxValue(evt) {
    evt.preventDefault();
    this.output = [];
    this.setState({
      max: evt.target.value,
      run: false,
      currentValue: 0
    });
  }

  onBlurFizz(evt) {
    evt.preventDefault();
    this.output = [];
    this.setState({
      fizz: evt.target.value,
      run: false,
      currentValue: 0
    });
  }

  onBlurBuzz(evt) {
    evt.preventDefault();
    this.output = [];
    this.setState({
      buzz: evt.target.value,
      run: false,
      currentValue: 0
    });
  }

  onClickRun(evt) {
    evt.preventDefault();
    this.output = [];
    this.setState({
      run: true,
      currentValue: 0
    });
    evt.stopPropagation();
  }

  onClickStop(evt) {
    evt.preventDefault();
    this.setState({
      run: false,
      currentValue: 0
    });
    evt.stopPropagation();
  }

  getOutput(currentValue, fizz, buzz) {
    let output = null;
    let fizzBuzz = 0;

    if (currentValue > 0 && currentValue % fizz === 0) {
      fizzBuzz = 1;
    }
    if (currentValue > 0 && currentValue % buzz === 0) {
      fizzBuzz = fizzBuzz + 2;
    }

    switch (fizzBuzz) {
      case 1: {
        output = (
          <div key={currentValue}>
            <span>{currentValue} - </span>
            <span>FIZZ</span>
          </div>
        );
        break;
      }
      case 2: {
        output = (
          <div key={currentValue}>
            <span>{currentValue} - </span>
            <span>BUZZ</span>
          </div>
        );
        break;
      }
      case 3: {
        output = (
          <div key={currentValue}>
            <span>{currentValue} - </span>
            <span>FIZZ BUZZ</span>
          </div>
        );
        break;
      }
      default: {
        output = (
          <div key={currentValue}>
            <span>{currentValue}</span>
          </div>
        )
      }
    };

    return output;
  }

  render() {
    const { fizz, buzz, max, timeout } = this.state;

    return (
      <div>
        <div>
          <h1>FizzBuzz</h1>
        </div>
        <div>
          <div>
            <label>
              Enter a number between 1 and 200
            </label>
          </div>
          <div>
            <input onBlur={this.onBlurMaxValue} defaultValue={max} />
          </div>
          <div>
            <label>
              Fizz - Enter a number between 1 and 20
            </label>
          </div>
          <div>
            <input defaultValue={fizz} onBlur={this.onBlurFizz} />
          </div>
          <div>
            <label>
              Buzz - Enter a number between 1 and 20
            </label>
          </div>
          <div>
            <input defaultValue={buzz} onBlur={this.onBlurBuzz} />
          </div>
          <div>
            <label>
              Enter a timeout delay between rendering
            </label>
          </div>
          <div>
            <input onBlur={this.onBlurTimeout} defaultValue={timeout} />
          </div>
          <div>
            <Button
              name='run'
              onClick={this.onClickRun}
              disabled={this.state.run}
            >
              Run
            </Button>
          </div>
          <div>
            <Button
              name='run'
              onClick={this.onClickStop}
              disabled={!this.state.run}
            >
              Stop
            </Button>
          </div>
        </div>
        <div>
          {this.output}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default withRouter(connect(mapStateToProps)(FizzBuzz));
