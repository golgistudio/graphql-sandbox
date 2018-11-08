export default {
  base: {
    fontSize: 13,
    fontWeight: 'bold',
    cursor: 'pointer',
    height: 35,
    borderRadius: 4,
    border: '1px solid transparent'
  },
  /* eslint-disable quote-props */
  primary: {
    backgroundColor: '#ADD8E6',
    color: '#FFFFFF',
    paddingLeft: 40,
    paddingRight: 40,
    ':hover': {
      backgroundColor: '#B0C4DE'
    }
  },
  secondary: {
    border: '1px solid #ADD8E6',
    color: '#ADD8E6',
    paddingLeft: 40,
    paddingRight: 40,
    ':hover': {
      border: '1px solid #B0C4DE',
      color: '#B0C4DE'
    }
  },
  flat: {
    paddingLeft: 0,
    paddingRight: 0,
    color: '#ADD8E6',
    ':hover': {
      color: '#B0C4DE'
    }
  },
  disabled: {
    backgroundColor: '#bdbdbd',
    color: '#FFFFFF',
    paddingLeft: 40,
    paddingRight: 40,
    cursor: 'not-allowed'
  }
};
