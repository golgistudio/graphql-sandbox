import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import MainLayout from 'layouts/MainLayout';
import configureMockStore from '../__setup__/mockedStore';


function setup(store) {
  const props = {
    dispatch: () => {},
    location: {},
  };

  return mount(
    <Provider store={store}>
      <MainLayout {...props} />
    </Provider>
  );
}

describe('MainLayout', () => {
  let wrapper;
  let store;
  const initialState = {
    user: {},
  };

  beforeEach(() => {
    store = configureMockStore(initialState);
    wrapper = setup(store);
  });

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });
});
