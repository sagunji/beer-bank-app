import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { fetchBeer, fetchBeers } from '../../../services/beerService';

import * as toast from '../../../utils/toast';

import Modal from '../../common/Modal';
import Spinner from '../../common/Spinner';
import SimilarBeers from './SimilarBeers';

class BeerModal extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      beer: {},
      similarBeers: []
    };
    this.fetchBeer = this.fetchBeer.bind(this);
  }

  componentDidMount() {
    this.toggleLoader(true);
    this.fetchBeer();
    this.toggleLoader(false);
  }

  toggleLoader = isLoading => {
    this.setState({ isLoading });
  };

  async fetchBeer() {
    try {
      let beer = await fetchBeer(this.props.beerId);

      this.setState({ beer: beer.pop() }, () => {
        this.fetchSimilarBeer();
      });
    } catch (err) {
      toast.error({
        title: 'Error',
        message: "Couldnot load beer's information"
      });
    }
  }

  async fetchSimilarBeer() {
    try {
      const pageInfo = { page: 1, per_page: 3 };

      const filter = {
        ebc_gt: this.state.beer.ebc - 1,
        ebc_lt: this.state.beer.ebc + 1
      };

      let similarBeers = await fetchBeers(pageInfo, filter);

      this.setState({
        similarBeers
      });
    } catch (err) {
      toast.error({
        title: 'Error',
        message: 'Something is wrong'
      });
    }
  }

  render() {
    const { show, handleClose } = this.props;
    const { isLoading, beer, similarBeers } = this.state;

    return (
      <Modal show={show} handleClose={handleClose}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="DescriptionModal clearfix">
            <div>
              <div className="DescriptionModal__left">
                <div
                  className="DescriptionModal__left__imgcontainer"
                  style={{ backgroundImage: `url(${beer.image_url})` }}
                />
              </div>
              <div className="DescriptionModal__right">
                <h1>{beer.name}</h1>
                <span className="DescriptionModal__right--title">{beer.tagline}</span>
                <ul>
                  <li>
                    <span className="bold">IBU:</span> {beer.ibu}
                  </li>
                  <li>
                    <span className="bold">ABV:</span> {beer.abv}%
                  </li>
                  <li>
                    <span className="bold">EBC:</span> {beer.ebc}
                  </li>
                </ul>
                <p>{beer.description}</p>
                <div className="DescriptionModal__right__list">
                  <span>Best served with: </span>
                  <ul>
                    {beer.food_pairing &&
                      beer.food_pairing.map((fp, index) => {
                        return <li key={index}>{fp}</li>;
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <SimilarBeers beers={similarBeers} />
          </div>
        )}
      </Modal>
    );
  }
}

BeerModal.propTypes = {
  beerId: PropTypes.number,
  show: PropTypes.bool,
  handleClose: PropTypes.func
};

export default BeerModal;
