import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';

import Header from '../common/Header';
import Beer from '../main/beers/Beer';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      searchFor: ''
    };
  }

  setSearchText = searchFor => {
    this.setState({ searchFor });
  };

  render() {
    let { favourite } = this.props;

    if (this.state.searchFor) {
      favourite = favourite.filter(fav => fav.name.toLowerCase().includes(this.state.searchFor.toLowerCase()));
    }

    return (
      <div className="wrapper">
        <Header setSearchText={this.setSearchText} />
        <main>
          <div className="container">
            {favourite &&
              favourite.map((beer, index) => {
                return <Beer key={index} info={beer} />;
              })}
          </div>
        </main>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    favourite: state.favouriteBeerReducer.get('favoritBeer')
  };
};

Favorites.propTypes = {
  favourite: PropTypes.array
};

export default connect(mapStateToProps)(Favorites);
