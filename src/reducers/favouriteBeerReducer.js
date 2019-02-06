import Immutable from 'immutable';

import * as actionTypeConstants from '../constants/actions';

let initialState = Immutable.Map({
  favoritBeer: []
});

export default function(state = initialState, action) {
  let favBeers = state.get('favoritBeer').slice() || [];

  switch (action.type) {
    case actionTypeConstants.ADD_BEER:
      favBeers.push(action.payload);

      return state.set('favoritBeer', favBeers);

    case actionTypeConstants.REMOVE_BEER:
      const beerToBeRemoved = favBeers.find(x => x.id === action.payload.id);

      let index = favBeers.indexOf(beerToBeRemoved);

      if (index > -1) {
        favBeers.splice(index, 1);
      }

      return state.set('favoritBeer', favBeers);

    default:
      return state;
  }
}
