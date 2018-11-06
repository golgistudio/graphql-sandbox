import React from 'react';
import { shallow } from 'enzyme';

import Sandbox from 'components/Sandbox';

function setup() {
  const props = {
    dispatch: () => {},
    location: {},
  };

  return shallow(<Sandbox {...props} />);
}

describe('Sandbox', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });
});
