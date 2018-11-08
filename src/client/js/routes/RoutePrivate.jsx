import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const RoutePrivate = ({
  layout: Layout, component: Component, isAuthenticated, to, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      isAuthenticated
        ? (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        )
        : (
          <Redirect
            to={{
              pathname: to,
              state: { redirect: props.location.pathname, isAuthenticated },
            }}
          />
        )
    )}
  />
);

RoutePrivate.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  layout: PropTypes.func.isRequired,
  location: PropTypes.object,
  to: PropTypes.string,
};

RoutePrivate.defaultProps = {
  to: '/',
};

export default RoutePrivate;
