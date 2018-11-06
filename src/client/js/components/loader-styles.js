import Radium from 'radium';

export const loader_bg = {
  width: '100%',
  height: '100vh',
  zIndex: '1000',
  position: 'fixed',
  margin: '0',
  padding: '0',
}

export const firstChild = 
  {
    animationDelay: '0s'
  };
export const secondChild = 
  {
    animationDelay: '-1.2s'
  };
export const thirdChild = 
  {
    animationDelay: '-1s',
  };
export const fourthChild = 
  {
    animationDelay: '-.8s',
  };
export const fifthChild = 
  {
    animationDelay: '-6s',
  };

export const loader = {
  position: 'absolute',
  left: '35%',
  transform: 'translate(-50%, -50%)',
  margin: '0',
  padding: '0',
  display: 'flex',
  listStyleType: 'none',
}

export const loadingKeyFrames = Radium.keyframes({
  '0%': { transform: 'translateY(0)' },
  '20%': { transform: 'translateY(10px)' },
  '40%': { transform: 'translateY(30px)' },
  '60%': { transform: 'translateY(10px)' },
  '80%': { transform: 'translateY(30px)' },
  '100%': { transform: 'translateY(0)' }
});

export const loader_li = {
  width: '15px',
  height: '15px',
  backgroundColor: '#eb622d',
  borderRadius: '20px',
  margin: '0.5rem',
  animation: 'animate 1.4s linear infinite',
  animationName: loadingKeyFrames
}
