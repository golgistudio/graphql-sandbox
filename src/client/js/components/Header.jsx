import React from 'react';
import PropTypes from 'prop-types';

import {
  NavBar,
  NavLink,
  NavItem,
} from 'tfs-ui';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user, onClickLogout } = this.props;
    return (
      <NavBar clientName='247.ai' toolName='TFS-UI-DEMO'>
        <NavItem>
          <NavLink
            href='https://247inc.atlassian.net/wiki/spaces/TFSUI/overview'
          >
            Documentation
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            Support
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href={null}
            onClick={onClickLogout}
          >
            <span onClick={onClickLogout}>
            Sign Out
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            {user.email}
          </NavLink>
        </NavItem>
      </NavBar>
    );
  }
}

Header.defaultProps = {
  onClickLogout: () => {},
  user: {
    email: 'temp@247.ai',
  },
};

Header.propTypes = {
  onClickLogout: PropTypes.func,
  user: PropTypes.object,
};

export default Header;
