import React from 'react'
import fetch from 'node-fetch';
import Layout from "../components/layout"
import Header from '../components/header'
import SearchBar from '../components/searchBar';
import Mapbox from '../components/mapbox';
import {Container, Row, Col} from 'reactstrap';
import LinkSmoothScroll from '../components/linkSmoothScroll';

const token = "pk.eyJ1IjoiYWxtYWRpcmVkZHkiLCJhIjoiY2ppdWwyczUxMXZyOTN2bnhrcGhlMXEwcCJ9.HjOEFxbJWmhxh2U091d-GA";

function bImage (max, min) {
  const r_number = Math.floor(Math.random() * (max - min + 1)) + min;
  return 'url(../static/home' + Math.floor(r_number).toString() + '.jpg)';
}

export default class Home extends React.Component {
  constructor(props) {
    super()
    
    this.state = {
      viewport: {
        height: 600,
        width: 1110,
        zoom: 13,
        pitch: 30,
        longitude: -73.97715657653053,
        latitude: 40.78090115314853
      },
      background_image: {
        backgroundImage: props.bImg, 
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }
    }
    
    this.scrollHandler = this.scrollHandler.bind(this)
    this.locationSelectHandler = this.locationSelectHandler.bind(this)
    this.handleViewportChange = this.handleViewportChange.bind(this)
  }


  static async getInitialProps({query}) {
    let articleRequest = await fetch("https://nyt-explore-articles-api-dot-nyt-explore-prd.appspot.com/articles");
    let imagesRequest = await fetch("https://nyt-explore-articles-api-dot-nyt-explore-prd.appspot.com/images")
    let j = await articleRequest.json();
    let i = await imagesRequest.json();
    
    let bimg = bImage(11, 1)
    return {
      articleGroups: j.groups, 
      imageGroups: i.groups,
      bImg: bimg
    };
  }

  handleViewportChange(viewport) {
    this.setState({
      viewport: viewport
    })
  }

  locationSelectHandler(e) {
    console.log(e)
    window.location.href = `/result-specific?longitude=${e.longitude}&latitude=${e.latitude}`
  }

  scrollHandler(e) {
    console.log("need to scroll")
  }

  render() {
    const background_image = {
      backgroundImage: bImage(12, 1), 
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      height: '100vh',
    }

    return (
      <Layout title="Home">
        <div style={this.state.background_image}>
          <div>
            <div id='HomePage'>
              <Container>
                <Row className="home-searchbar-row">
                  <Col className="home-searchbar-container">
                    <Header style={{
                      position: "fixed",
                      paddingTop: "35px"
                    }} title="NYT Explore" />
                    <SearchBar onSelected={this.locationSelectHandler} token={token} />
                    <LinkSmoothScroll href="/#map">
                      <a className="arrow"> 
                        <span></span>
                        <span></span>
                        <span></span>
                      </a>
                    </LinkSmoothScroll>
                  </Col>
                </Row>
                <Row id="map" className="home-mapbox">
                  <Col>
                    <Mapbox
                      articleGroups={this.props.articleGroups}
                      imageGroups={this.props.imageGroups}
                      token={token}
                      viewport={this.state.viewport}
                      onViewportChange={this.handleViewportChange}>
                    </Mapbox>
                  </Col>
                </Row>
              </Container>
              <div className="nytLogo">
                <img src='../static/nytfull.png'/>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
