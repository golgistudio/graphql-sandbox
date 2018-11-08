import React from 'react';
import PropTypes from 'prop-types';

import {
  NavLink,
} from 'react-router-dom';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user, onClickLogout } = this.props;
    return (
      <div>
        <div
          onClick={onClickLogout}
        >
          Sign Out
        </div>
        <div>
          {user.email}
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  onClickLogout: () => { },
  user: {
    email: 'temp@247.ai',
  },
};

Header.propTypes = {
  onClickLogout: PropTypes.func,
  user: PropTypes.object,
};

export default Header;
