import React, { Component } from 'react';
import Geocoder from 'react-mapbox-gl-geocoder'

const token = "pk.eyJ1IjoiYWxtYWRpcmVkZHkiLCJhIjoiY2ppdWwyczUxMXZyOTN2bnhrcGhlMXEwcCJ9.HjOEFxbJWmhxh2U091d-GA";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: null
    }
    this.onSelected = this.onSelected.bind(this)
  }

  onSelected = (viewport, item) => {
    this.setState({viewport});
    console.log('Selected: ', item)
  }

  render() {
    return (
      <div className="search-container">
        <div className="cheltenham prompt"> 
          Where do you want to go?
        </div>
        <div className="search">
          <img src='../static/search.png'/>

          <Geocoder
            viewport={this.props.viewport}
            transitionDuration={1500}
            onSelected={this.props.onSelected}
            mapboxApiAccessToken={token}
            hideOnSelect={true}
          />
        </div>
      </div>
    );
  }
}
