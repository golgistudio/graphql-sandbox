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
    backgroundColor: '#77FFCC',
    color: '#FFFFFF',
    paddingLeft: 40,
    paddingRight: 40,
    ':hover': {
      backgroundColor: '#1BBF6C'
    }
  },
  secondary: {
    border: '1px solid #77FFCC',
    color: '#77FFCC',
    paddingLeft: 40,
    paddingRight: 40,
    ':hover': {
      border: '1px solid #1BBF6C',
      color: '#1BBF6C'
    }
  },
  flat: {
    paddingLeft: 0,
    paddingRight: 0,
    color: '#77FFCC',
    ':hover': {
      color: '#1BBF6C'
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
