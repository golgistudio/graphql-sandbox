import React from 'react';
import { shallow } from 'enzyme';

import DialogDemo from 'components/DialogDemo';

function setup() {
  const props = {
    dispatch: () => {},
    location: {},
  };

  return shallow(<DialogDemo {...props} />);
}

describe('DialogDemo', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });
});
