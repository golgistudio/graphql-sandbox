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
    backgroundColor: '#BB9966',
    color: '#FFFFFF',
    paddingLeft: 40,
    paddingRight: 40,
    ':hover': {
      backgroundColor: '#996633'
    }
  },
  secondary: {
    border: '1px solid #BB9966',
    color: '#BB9966',
    paddingLeft: 40,
    paddingRight: 40,
    ':hover': {
      border: '1px solid #996633',
      color: '#996633'
    }
  },
  flat: {
    paddingLeft: 0,
    paddingRight: 0,
    color: '#BB9966',
    ':hover': {
      color: '#996633'
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
