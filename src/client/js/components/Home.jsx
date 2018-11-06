import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { login } from 'actions/index';
import { Button, Themer, TextField } from 'tfs-ui';

class HomeComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor(props) {
    super(props);

    this.name = 'Home';

    this.onChange = this.onChange.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  componentWillMount() {
    Themer.theme = 'tools';
  }

  componentDidMount() {
    const { username, onSubmitForm } = this.props;

    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
  }

  handleClickLogin = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(login());
  };


  onChange(e) {
    const value = e.target.value || '';
    Themer.theme = value;
    this.forceUpdate();
  }

  render() {
    const { user } = this.props;
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name='description' content='A demo application to show capabilities of tfs-ui' />
        </Helmet>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <select
            style={{
              margin: '10px',
            }}
            onChange={this.onChange}
          >
            <option value='tools'>Tools</option>
            <option value='demo'>Demo</option>
          </select>
        </div>
        <div
          style={{
            marginTop: '20px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '2.5rem',
            }}
          >
            Welcome to tfs-ui-demo
          </div>
          <div>
            A demo application for tfs-ui
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              padding: '6px',
            }}
          >
            <span>
            Email:
            </span>
            <div>
              <TextField name='email' type='text' defaultValue={user.email} required />
            </div>
          </div>
          <div
            style={{
              padding: '6px',
            }}
          >
          Password:
            <div>
              <TextField name='password' type='text' required />
            </div>
          </div>
          <br />
          <div>
            <div
              style={{
                padding: '10px',
                float: 'left',
              }}
            >
              <Button
                type='primary'
                onClick={this.handleClickLogin}
              >
                <span> Submit </span>
              </Button>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

HomeComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func,
  user: PropTypes.object.isRequired,
  username: PropTypes.string,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(HomeComponent);
