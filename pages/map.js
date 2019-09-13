import React from 'react';
import fetch from 'node-fetch';
import Layout from "../components/layout";
import Header from '../components/header';
import Mapbox from '../components/mapbox';
import Head from 'next/head'
import SearchBar from '../components/searchBar';
import {Container, Row, Col} from 'reactstrap';

const token = "pk.eyJ1IjoiYWxtYWRpcmVkZHkiLCJhIjoiY2ppdWwyczUxMXZyOTN2bnhrcGhlMXEwcCJ9.HjOEFxbJWmhxh2U091d-GA";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLatitude: props.initialLatitude,
      initialLongitude: props.initialLongitude 
    }
    this.onSelected = this.onSelected.bind(this);
    this.handleViewportChange = this.handleViewportChange.bind(this)
  }
  
  static async getInitialProps({query}) {
    let articleRequest = await fetch("https://nyt-explore-articles-api-dot-nyt-explore-prd.appspot.com/articles");
    let imagesRequest = await fetch("https://nyt-explore-articles-api-dot-nyt-explore-prd.appspot.com/images")
    let j = await articleRequest.json();
    let i = await imagesRequest.json();
    
    return {
      articleGroups: j.groups, 
      imageGroups: i.groups,
      initialLongitude: Number(query.longitude) || -73.97715657653053,
      initialLatitude: Number(query.latitude) || 40.78090115314853
    };
  }

  onSelected(viewport, item) {
    this.setState({
      initialLatitude: viewport.latitude,
      initialLongitude: viewport.longitude
    })
  }

  handleViewportChange(viewport) {
    this.setState({
      initialLatitude: viewport.latitude,
      initialLongitude: viewport.longitude
    })
  }

  bImage(max, min) {
    const r_number = Math.floor(Math.random() * (max - min + 1)) + min;
    return 'url(../static/home' + Math.floor(r_number).toString() + '.jpg)';
  }

  render() {
    const background_image = {
      backgroundColor: "#000",
      height: '100vh',
    }
    return (
      <Layout title="Home">
        <Head>
          <link href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css' rel='stylesheet' />
        </Head>
        <div className="hero">
          <Header title="NYT Explore" currentLocation="New York City">
            <SearchBar viewport={this.state.viewport} onSelected={this.onSelected} token={token}></SearchBar>
          </Header>
        </div>
        <Container>
          <Row className="justify-content-center map-row">
            <Col className="mapglContainer">
              <Mapbox 
                token={token}
                viewport={{
                  latitude: this.state.initialLatitude,
                  longitude: this.state.initialLongitude,
                  width: "100%",
                }}
                onViewportChange={this.handleViewportChange}
                articleGroups={this.props.articleGroups}
                imageGroups={this.props.imageGroups}>
              </Mapbox>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}
