const errCheck = (store) => (next) => (action) => {
  if (action.type === 'error') {
    console.log('error! error! shit shit shit!');
    return;
  }
  return next(action);
};

export default errCheck;
