import React from 'react';
import PropTypes from 'prop-types'

const ExploreCategory = (props) => (
  <div className="card explore-category">
    <img src={props.src}></img>
    <h2>{props.name}</h2>
    <p>{props.description}</p>
  </div>
)

ExploreCategory.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string
}

export default ExploreCategory
