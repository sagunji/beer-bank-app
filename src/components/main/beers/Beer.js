import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { beerActions } from '../../../actions';

import BeerModal from './BeerModal';

class Beer extends Component {
  state = { show: false, isFavorite: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  addToFavourite = info => {
    const foundBeer = this.props.favourite.find(x => x.id === info.id);

    if (foundBeer) {
      this.setState({
        isFavorite: false
      });
      this.props.actions.removeBeer(info);
    } else {
      this.setState({
        isFavorite: true
      });
      this.props.actions.addBeer(info);
    }
  };

  render() {
    const foundBeer = this.props.favourite.find(x => x.id === this.props.info.id);

    return (
      <React.Fragment>
        {this.state.show ? (
          <BeerModal show={this.state.show} handleClose={this.hideModal} beerId={this.props.info.id} />
        ) : null}
        <div className="card">
          <span className={`favourite ${this.state.isFavorite || foundBeer ? 'active' : ''}`}>
            <i className="far fa-star" onClick={() => this.addToFavourite(this.props.info)} />
          </span>
          <div className="card__imgcontainer" style={{ backgroundImage: `url(${this.props.info.image_url})` }}>
            {/* <img src={this.props.info.image_url} alt={this.props.info.name} /> */}
          </div>
          <h2 onClick={this.showModal}>{this.props.info.name}</h2>
          <span className="card__description">
            {this.props.info.description.length > 200
              ? `${this.props.info.description.substring(0, 200)}...`
              : this.props.info.description}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

Beer.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string
  }),
  favourite: PropTypes.array,
  actions: PropTypes.object
};

let mapStateToProps = state => {
  return {
    favourite: state.favouriteBeerReducer.get('favoritBeer') || []
  };
};

let mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Object.assign({}, beerActions), dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Beer);
