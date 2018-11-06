import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Radium from "radium";
import ThemeWrapper from "../themes/ThemeWrapper";

class Button extends PureComponent {
  render() {
    const {
      name,
      disabled,
      tabIndex,
      children,
      themeStyle,
      styleOverride,
      type,
      ...otherProps
    } = this.props;

    const buttonStyle = themeStyle.button;
    const buttonStyles = [buttonStyle.base, buttonStyle[type], styleOverride];

    if (disabled) {
      buttonStyles.push(buttonStyle.disabled);
    }

    return (
      <button
        name={name}
        type="button"
        style={buttonStyles}
        tabIndex={tabIndex}
        disabled={disabled}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "secondary", "flat"]),
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  children: PropTypes.node.isRequired,
  themeStyle: PropTypes.object,
  styleOverride: PropTypes.object
};

Button.defaultProps = {
  type: "primary",
  disabled: false,
  tabIndex: 0,
  themeStyle: {},
  styleOverride: {}
};

export default ThemeWrapper(Radium(Button));
