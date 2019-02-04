const config = {
  env: process.env.NODE_ENV,
  baseURI: process.env.REACT_APP_API_BASE_URI,
  endpoints: {
    beers: '/beers',
    beer: '/beers/:id',
    randomBeer: '/beer/random'
  }
};

export default config;
