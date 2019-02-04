import http from '../utils/http';
import { interpolate } from '../utils/string';

import config from '../config';

/**
 * Fetch beers.
 *
 * @returns {Promise<{object}>}
 */

export async function fetchBeers(pageInfo = { page: 1, per_page: 25 }, filter = {}) {
  const url = config.endpoints.beers;

  const params = { ...filter, ...pageInfo };

  const { data } = await http.get(url, { params });

  return data;
}

/**
 * Fetch data of the single beer by id.
 *
 * @param {string} id
 * @returns {Promise<{object}>}
 */
export async function fetchBeer(id) {
  const url = interpolate(config.endpoints.beer, { id });
  const { data } = await http.get(url);

  return data;
}

/**
 * Fetch random beer.
 *
 * @returns {Promise<{object}>}
 */
export async function fetchRandomBeer() {
  const url = config.endpoints.randomBeer;
  const { data } = await http.get(url);

  return data;
}
