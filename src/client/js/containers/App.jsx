import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Helmet from 'react-helmet';
import cx from 'classnames';
import treeChanges from 'tree-changes';
import history from 'modules/history';

import config from 'config';
import { showAlert } from 'state/actions';

import Home from 'components/Home';
import TableDemo from 'components/TableDemo';
import Sandbox from 'components/Sandbox';
import NotFound from 'routes/NotFound';

import MainLayout from 'layouts/MainLayout';

import SystemAlerts from 'containers/SystemAlerts';

import RoutePublic from 'routes/RoutePublic';
import RoutePrivate from 'routes/RoutePrivate';

export class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(this.props, nextProps);

    /* istanbul ignore else */
    if (changedTo('user.isAuthenticated', true)) {
      dispatch(showAlert('Hello! And welcome!', { type: 'success', icon: 'i-trophy' }));
    }
  }

  render() {
    const { app, dispatch, user } = this.props;

    return (
      <ConnectedRouter history={history}>
        <div
          className={cx('app', {
            'app--private': user.isAuthenticated,
          })}
        >
          <Helmet
            defer={false}
            htmlAttributes={{ lang: 'pt-br' }}
            encodeSpecialCharacters
            defaultTitle={config.title}
            titleTemplate={`%s | ${config.name}`}
            titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
          />
          <main>
            <Switch>
              <RoutePublic isAuthenticated={user.isAuthenticated} path="/" exact component={Home} />
              <RoutePrivate isAuthenticated={user.isAuthenticated} path="/table" component={TableDemo} layout={MainLayout} />
              <RoutePrivate isAuthenticated={user.isAuthenticated} path="/sandbox" component={Sandbox} layout={MainLayout} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <SystemAlerts alerts={app.alerts} dispatch={dispatch} />
        </div>
      </ConnectedRouter>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
