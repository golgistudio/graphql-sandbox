import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { loadLocales } from "../state/localeState";

import Button from "../components/Button";

import Greeting from "../components/Greeting";
import LocaleSelector from "../components/LocaleSelector";

class Localization extends PureComponent {
  constructor(props) {
    super(props);

    this.onClickLoadLocales = this.onClickLoadLocales.bind(this);
  }

  onClickLoadLocales() {
    this.props.dispatch(loadLocales());
  }

  render() {
    return (
      <div>
        <h1>Localization</h1>
        <Button name="locale" key="locale" onClick={this.onClickLoadLocales}>
          Local locales
        </Button>{" "}
        <LocaleSelector />
        <Greeting />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default withRouter(connect(mapStateToProps)(Localization));
