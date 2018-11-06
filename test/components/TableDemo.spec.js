import React from 'react';
import { shallow } from 'enzyme';

import TableDemo from 'components/TableDemo';

function setup() {
  const props = {
    dispatch: () => {},
    location: {},
  };

  return shallow(<TableDemo {...props} />);
}

describe('TableDemo', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });
});
