import { ADD_BEER, REMOVE_BEER } from '../constants/actions';

export function addBeer(payload) {
  return { type: ADD_BEER, payload };
}

export function removeBeer(payload) {
  return { type: REMOVE_BEER, payload };
}
