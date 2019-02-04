import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as beerService from '../../../services/beerService';

import * as toast from '../../../utils/toast';

import Header from '../../common/Header';
import Spinner from '../../common/Spinner';

import Beer from './Beer';

class BeerGrid extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      beers: [],
      pageInfo: { page: 0, per_page: 25 },
      searchFor: '',
      isSearchByText: false
    };
    this.fetchBeers = this.fetchBeers.bind(this);
  }

  setSearchText = searchFor => {
    this.setState(
      {
        searchFor,
        isSearchByText: true
      },
      () => this.fetchBeers()
    );
  };

  toggleLoading = isLoading => {
    this.setState({
      isLoading
    });
  };

  componentDidMount() {
    this.fetchBeers();
  }

  async fetchBeers() {
    this.toggleLoading(true);
    let newPageInfo = Object.assign({}, this.state.pageInfo);

    if (!this.state.isSearchByText) {
      newPageInfo.page += 1;
    } else {
      newPageInfo.page = 1;
    }

    let filter = this.state.searchFor === '' ? {} : { beer_name: this.state.searchFor };

    try {
      let results = await beerService.fetchBeers(newPageInfo, filter);

      let beers = this.state.isSearchByText ? [] : this.state.beers.slice();

      this.setState({
        beers: beers.concat(results),
        pageInfo: newPageInfo,
        isSearchByText: false
      });
    } catch (err) {
      toast.error({
        title: 'Error',
        message: 'Something is wrong'
      });
    }
    this.setState({
      isSearchByText: false
    });
    this.toggleLoading(false);
  }

  render() {
    const { beers } = this.state;

    return (
      <React.Fragment>
        <Header setSearchText={this.setSearchText} />

        <main>
          <div className="container" ref={ref => (this.scrollParentRef = ref)}>
            <InfiniteScroll
              dataLength={this.state.beers.length}
              next={this.fetchBeers}
              hasMore={true}
              loader={<Spinner />}
            >
              {beers.map((beer, index) => {
                return <Beer key={index} info={beer} />;
              })}
            </InfiniteScroll>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default BeerGrid;
