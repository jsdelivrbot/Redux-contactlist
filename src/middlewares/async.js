export default function({ dispatch }) { // a function that gets called with dispatch
  return next => action => {
    // if the payload doesnt have a ".then" property
    // only focus on the action that we care about
    // otherwise, call next with the action
    // so that it can propagate to other middlewares
    if (!action.payload || !action.payload.then) {
      return next(action); //next just chains on to the next middleware
    }
    // ensure that the promise resolves
    action.payload
      .then(function(response) {
        const newAction = { ...action, payload: response };
      //take whatever the current action contains and extend the
      //new data over it (the response) (replacing promise with response)
        dispatch(newAction);
      // takes the action and sends it to the very top reducer
      // just to ensure that the ORDER OF THE MIDDLEWARE DOESNT MATTER
      });
  };
}

/*
export default function({ dispatch }) {
  return function(next) {
    return function(action) {
      console.log(action);

      next(action);
    }
  }
}
*/
