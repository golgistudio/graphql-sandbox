import React from 'react';
import Router from 'react-router-dom/MemoryRouter';
import { renderToString } from 'react-dom/server';
import RoutePrivate from 'routes/RoutePrivate';

describe('modules/RoutePrivate', () => {
  it('should redirect for unauthenticated access', () => {
    const render = renderToString(
      <Router initialEntries={['/table']}>
        <RoutePrivate
          exact
          path="/table"
          component={() => (<div>PRIVATE</div>)}
          isAuthenticated={false}
        />
      </Router>);

    expect(render).toMatchSnapshot();
  });

  it('should allow navigation for authenticated access', () => {
    const render = renderToString(
      <Router initialEntries={['/table']}>
        <RoutePrivate
          exact
          path="/table"
          component={() => (<div>PRIVATE</div>)}
          isAuthenticated
          layout={() => (<div>Layout</div>)}
        />
      </Router>
    );

    expect(render).toMatchSnapshot();
  });
});
