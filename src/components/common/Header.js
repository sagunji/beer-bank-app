import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { HOME, FAVORITES } from '../../constants/routes';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      searchText: ''
    };
  }

  handleTextChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };

  searchBy = e => {
    e.preventDefault();
    this.props.setSearchText(this.state.searchText);
  };

  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="header__top">
            <ul className="nav">
              <li>
                <Link to={HOME} title="home">
                  home
                </Link>
              </li>
              <li>
                <Link to={FAVORITES} title="favourite">
                  favourite
                </Link>
              </li>
            </ul>
          </div>
          <div className="header__bottom">
            <h1>The Beer Bank</h1>
            <span>Find your favourite beer here</span>
            <form onSubmit={this.searchBy}>
              <input
                type="search"
                value={this.state.searchText}
                onChange={this.handleTextChange}
                placeholder="Search for the beer name"
              />
            </form>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
