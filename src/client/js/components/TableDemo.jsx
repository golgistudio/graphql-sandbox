import React from 'react';

import Github from 'containers/GitHub';

class TableDemo extends React.PureComponent {
  render() {
    return (
      <div
        className='app__private__content'
        style={{
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        <div className='app__private__intro'>
          <h5>Here's some GitHub data</h5>
          <small className='text-muted'><i>*Just to have some requests in the sagas...</i></small>
        </div>
        <Github />
      </div>
    );
  }
}

export default TableDemo;
