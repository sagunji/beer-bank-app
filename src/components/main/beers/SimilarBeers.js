import React from 'react';

const SimilarBeers = ({ beers }) => {
  return (
    <div className="DescriptionModal__options">
      <h2>You might also like</h2>
      <div>
        {beers.length > 0 &&
          beers.map((sb, index) => {
            return (
              <div className="option-card" key={index}>
                <div className="option-card__imgcontainer" style={{ backgroundImage: `url(${sb.image_url})` }} />
                <span className="option-card__title">{sb.name}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SimilarBeers;
