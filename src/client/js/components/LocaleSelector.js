import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { updateIntl } from "react-intl-redux";

class LocaleSelector extends Component {
  constructor(props) {
    super(props);

    this.getOptions = this.getOptions.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getOptions() {
    const { locales } = this.props;

    if (!_.isNil(locales)) {
      return Object.keys(locales).map(locale => {
        return <option key={locale}>{locale}</option>;
      });
    }
    return [];
  }

  onChange(evt) {
    const { dispatch, locales } = this.props;

    const value = evt.target.value;
    dispatch(
      updateIntl({
        locale: value,
        messages: locales[value]
      })
    );
  }

  render() {
    const { currentLocale } = this.props;

    return (
      <select value={currentLocale} onChange={this.onChange}>
        {this.getOptions()}
      </select>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentLocale: state.intl.locale,
    locales: state.locales
  };
}

export default connect(mapStateToProps)(LocaleSelector);
