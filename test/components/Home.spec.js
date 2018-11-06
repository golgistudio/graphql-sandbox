import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Home from 'components/Home';
import configureMockStore from '../__setup__/mockedStore';


const mockDispatch = jest.fn();

function setup(store) {
  const props = {
    dispatch: mockDispatch,
    location: {},
    user: {},
  };

  return mount(
    <Provider store={store}>
      <Home {...props} />
    </Provider>
  );
}

describe('Home', () => {
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

  it.skip('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it.skip('should handle clicks', () => {
    wrapper.find('.btn').simulate('click');
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: 'USER_LOGIN',
      payload: {},
    });
  });
});
