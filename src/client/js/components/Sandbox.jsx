import React from 'react';

class Documentation extends React.PureComponent {
  render() {
    return (
      <div
        className="app__private__content"
        style={{
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        <div>
          <h2>
            This page left intentially blank!
          </h2>
        </div>

        <div
          style={{
            marginTop: '20px',
          }}
        >
            To experiment with tfs-ui - edit components/Sandbox.jsx.
        </div>
      </div>
    );
  }
}

export default Documentation;
