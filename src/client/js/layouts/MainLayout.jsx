import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import Button from 'components/Button';

import Header from 'components/Header';
import { logOut } from 'state/actions';

class MainLayoutComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onClickLogout = this.onClickLogout.bind(this);
    this.onClickTable = this.onClickTable.bind(this);
    this.onClickDialog = this.onClickDialog.bind(this);
    this.onClickSandbox = this.onClickSandbox.bind(this);

    this.sepStyles = {
      borderLeft: 'solid 1px lightgrey',
      width: '2px',
      marginLeft: '5px',
      marginRight: '5px',
      height: '3.0rem',
    };
  }

  onClickSandbox(evt) {
    const { dispatch } = this.props;
    evt.preventDefault();
    dispatch(replace('/sandbox'));
  }

  onClickDialog(evt) {
    const { dispatch } = this.props;
    evt.preventDefault();
    dispatch(replace('/dialog'));
  }

  onClickTable(evt) {
    const { dispatch } = this.props;
    evt.preventDefault();
    dispatch(replace('/table'));
  }

  onClickLogout(evt) {
    const { dispatch } = this.props;
    evt.preventDefault();

    dispatch(logOut());
  }

  render() {
    const { user, children } = this.props;
    return (
      <article>
        <Helmet>
          <title>tfs-ui-demo</title>
          <meta name="description" content="A demo application to show capabilities of tfs-ui" />
        </Helmet>
        <Header
          onClickLogout={this.onClickLogout}
          userEmail={user.email}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginLeft: '20px',
          }}
        >
          <Button
            type="flat"
            onClick={this.onClickTable}
          >
            Table
          </Button>
          <div style={this.sepStyles} />
          <Button
            type="flat"
            onClick={this.onClickDialog}
          >
            Dialog
          </Button>
          <div style={this.sepStyles} />
          <Button
            type="flat"
            onClick={this.onClickSandbox}
          >
            Sandbox
          </Button>
        </div>
        <div
          className="app__private__content"
          style={{
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          {children}
        </div>
      </article>
    );
  }
}

MainLayoutComponent.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(MainLayoutComponent);
