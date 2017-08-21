export default store => next => action => {
  const result = next(action);
  console.log(action);
};
