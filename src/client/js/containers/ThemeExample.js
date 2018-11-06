import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Themes, { selectTheme, registerAllThemes } from "../themes/Themes";
import Button from "../components/Button";

class ThemeExample extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    registerAllThemes();
    const themes = Themes();
    this.themeOptions = [];
    themes.forEach(item => {
      this.themeOptions.push(
        <option value={item.name} key={item.name}>
          {item.displayName}
        </option>
      );
    });
  }

  onChange(e) {
    const value = e.target.value || "";
    selectTheme(value);
    this.forceUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Theme Example</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%"
          }}
        >
          <select
            style={{
              margin: "10px"
            }}
            onChange={this.onChange}
          >
            {this.themeOptions}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Button name="left" key="left">
            Left
          </Button>
          <Button name="center" key="center" type="secondary">
            Center
          </Button>
          <Button name="right" key="right" type="flat">
            Right
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default withRouter(connect(mapStateToProps)(ThemeExample));
