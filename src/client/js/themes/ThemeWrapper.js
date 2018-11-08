// Higher order component that force updates component on themer change
// and passes down theme through props
import React, { Component } from 'react';
import ThemeManager from './ThemeManager';

const isStateless = (component) => !component.prototype.render;

function ThemeWrapper(BaseComponent) {
  class Wrapper extends Component {
    static displayName = `ThemeWrapper(${BaseComponent.name
      || BaseComponent.displayName
      || 'Component'})`;

    componentDidMount() {
      // register this component for notifications when
      // the theme changes
      this.themeSubscriptionId = ThemeManager.subscribe(
        this.onChangeTheme.bind(this)
      );
    }

    componentWillUnmount() {
      // Unsubscribe to theme change notifications
      ThemeManager.unsubscribe(this.themeSubscriptiondId);
    }

    onChangeTheme = () => {
      // Theme has changes - force update
      this.forceUpdate();
    };

    render() {
      const getRef = (node) => (this.wrapper = node);
      const theme = ThemeManager.settings;

      return (
        <BaseComponent
          ref={isStateless(BaseComponent) ? undefined : getRef}
          themeStyle={theme}
          {...this.props}
        />
      );
    }
  }

  return Wrapper;
}

export default ThemeWrapper;
