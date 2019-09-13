import React, { Component } from 'react'
import Layout from '../components/layout'
import Header from '../components/header'
import fetch from 'node-fetch';
import Mapbox from '../components/mapbox';
import SearchBar from '../components/searchBar';
import { Result } from '../components/results';

import { Col, Row, Container } from 'reactstrap';

const token = "pk.eyJ1IjoiYWxtYWRpcmVkZHkiLCJhIjoiY2ppdWwyczUxMXZyOTN2bnhrcGhlMXEwcCJ9.HjOEFxbJWmhxh2U091d-GA";

const events = [
    {
        image: '../static/event1.svg',
        link: 'https://theshed.org/program/5-dragon-spring-phoenix-rise'
    },
    {
        image: '../static/event2.svg',
        link: 'http://www.lincolncenter.org/mostly-mozart-festival/'
    },
    {
        image: '../static/event3.svg',
        link: 'https://www.nytfoodfestival.com/'
    },
    {
        image: '../static/event4.svg',
        link: 'https://fierman.nyc/'
    },
    {
        image: '../static/event5.svg',
        link: 'https://www.tfana.org/current-season/fairview/overview'
    },
];

const artworks = [
    '../static/arts1.jpg',
    '../static/arts2.jpg',
    '../static/arts3.jpg',
    '../static/arts4.jpg',
    '../static/arts5.jpg',
    '../static/arts6.jpg',
    '../static/arts7.jpg',
];

const styleCarousel = [
    '../static/style1.jpg',
    '../static/style2.jpg',
    '../static/style3.jpg',
    '../static/style4.jpg',
    '../static/style5.jpg',
    '../static/style6.jpg',
    '../static/style7.jpg',
];

const foodCarousel = [
    {
        image:'../static/food1.png',
        link: 'https://cooking.nytimes.com/recipes/1017359-sheet-pan-chicken-with-potatoes-arugula-and-garlic-yogurt?action=click&module=Global%20Search%20Recipe%20Card&pgType=search&rank=11'
    },
    {
        image:'../static/food2.png',
        link: 'https://cooking.nytimes.com/recipes/1018185-strawberry-cassata?action=click&module=Local%20Search%20Recipe%20Card&pgType=search&rank=1'
    },
    {
        image:'../static/food3.png',
        link: 'https://cooking.nytimes.com/recipes/1016231-pizza-margherita?action=click&module=Global%20Search%20Recipe%20Card&pgType=search&rank=8'
    },
    {
        image:'../static/food4.png',
        link: 'https://cooking.nytimes.com/recipes/1016753-corn-risotto?action=click&module=Global%20Search%20Recipe%20Card&pgType=search&rank=2'
    },
    {
        image:'../static/food5.png',
        link: 'https://cooking.nytimes.com/recipes/1019365-coconut-shrimp-curry-with-mushrooms?action=click&module=Global%20Search%20Recipe%20Card&pgType=search&rank=23'
    },
    {
        image:'../static/food6.png',
        link: 'https://cooking.nytimes.com/recipes/1019419-breakfast-salad?action=click&module=Global%20Search%20Recipe%20Card&pgType=search&rank=16'
    },
    {
        image:'../static/food7.png',
        link: 'https://cooking.nytimes.com/recipes/1017151-lemon-almond-butter-cake?action=click&module=Global%20Search%20Recipe%20Card&pgType=search&rank=13'
    },
    {
        image:'../static/food8.png',
        link: 'https://cooking.nytimes.com/recipes/1013858-pork-katsu-with-pickled-cucumbers-and-shiso?action=click&module=Collection%20Page%20Recipe%20Card&region=Japan&pgType=collection&rank=15'
    },
    {
        image:'../static/food9.png',
        link: 'https://cooking.nytimes.com/recipes/1019152-salted-chocolate-chunk-shortbread-cookies?action=click&module=Collection%20Page%20Recipe%20Card&region=Our%20Best%20Chocolate%20Chip%20Cookie%20Recipes&pgType=collection&rank=2'
    },
];

const smallerPic = {
    flex: 1,
    height: 200,
    resizeMode: 'contain'
};

const jNotesFood = [
    {
        picture: '../static/samsifton.png',
        quote: "The first slice of pizza a child sees and tastes (and somehow appreciates on something more than a childlike, mmmgoood, thanks-mom level), becomes, for him, pizza. He relegates all subsequent slices, if they are different in some manner from that first triangle of dough and cheese and tomato and oil and herbs and spices, to a status that we can characterize as not pizza.",
        name: "-Sam Sifton",
        title: "New York Times Food Editor"
      },
      {
        picture: '../static/melissaclark.png',
        quote: "Here’s a game for the food-obsessed: Instead of contemplating which historical figures you’d invite to a dinner party, picture the dishes you’d serve for the meal.",
        name: "-Melissa Clark",
        title: "New York Times Food Columnist"
      },
];

const jNotesEvents = [
    {
        picture: '../static/giovannirussonello.png',
        quote: "Moran has consistently situated his work along the divide between music, visual art, literature and historical inquiry.",
        name: "-Giovanni Russonello",
        title: "New York Times Music Journalist",
        loc:  'Whitney Museum of American Art from Sept. 20-Jan. 5'
    },
    {
        picture: '../static/sebastianmodak.png',
        quote: "Everything is transformed for the duration of the festival. You can grab a beer to go at the local bike shop, or mill around what is usually a furniture store sipping on white wine. Elsewhere, caveaux, underground wine cellars, have been converted into night clubs where after dark, the performers, still in costume, pump their fists to cheesy electro music.",
        name: "-Sebastian Modak",
        title: "New York Times 2019 52 Places Traveler",
        loc: 'Vevey, Switzerland’s Fête des Vignerons until Aug. 11th'
    },
];

const jNotesArts = [
    {
        picture: '../static/wmimg.svg',
        quote: "Taylor Swift's 'You Need to Calm Down' is as much a music video as it is a detonated rainbow-flag piñata.",
        name: "-Wesley Morris",
        title: "New York Times Critic-at-Large"
      },
    {
        picture: '../static/jonimg.svg',
        quote: "Music, more so than other disciplines, has become difficult because it can get made much more quickly these days. An album that has just been completed today can be put out in a week from now.",
        name: "-Jon Caramanica",
        title: "New York Times Pop Music Critic"
    }
];

const jNotesStyle = [
    {
        picture: '../static/vanessafriedman.png',
        quote: "Mr. Lagerfeld was the definition of a fashion polyglot, able to speak the language of many different brands at the same time.",
        name: "-Vanessa Friedman",
        title: "New York Times Fashion Director & Chief Fashion Critic"
      },
    {
        picture: '../static/beeshapiro.png',
        quote: "Like ice cream and barbecues, summer and frizzy hair go hand in hand. Treat your hair kindly",
        name: "-Bee Shapiro",
        title: "New York Times Beauty Columnist"
    }
];

export default class ResultSpecific extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false,
      collapse1: false,
      collapse2: false,
      collapse3: false,
      collapse4: false,
      display: 1,
      initialLatitude: props.initialLatitude,
      initialLongitude: props.initialLongitude
    };
    this.onSelected = this.onSelected.bind(this);
    this.viewportChangeHandler = this.viewportChangeHandler.bind(this)
    this.initial = this.initial.bind(this)
    this.expandS1 = this.expandS1.bind(this)
    this.expandS2 = this.expandS2.bind(this)
    this.expandS3 = this.expandS3.bind(this)
    this.expandS4 = this.expandS4.bind(this)
  }

  initial() {
    this.setState({
      display: 1,
      collapse1: 0,
      collapse2: 0,
      collapse3: 0,
      collapse4: 0
    })
  }

  expandS1() {
    this.setState({
      display: 3,
      collapse1: !this.state.collapse
    })
  }

  expandS2() {
    this.setState({
      display: 3,
      collapse2: !this.state.collapse
    })
  }

  expandS3() {
    this.setState({
      display: 3,
      collapse3: !this.state.collapse
    })
  }

  expandS4() {
    this.setState({
      display: 3,
      collapse4: !this.state.collapse
    })
  }


  static async getInitialProps({ query }) {
    let articleRequest = await fetch("https://nyt-explore-articles-api-dot-nyt-explore-prd.appspot.com/articles");
    let imagesRequest = await fetch("https://nyt-explore-articles-api-dot-nyt-explore-prd.appspot.com/images")
    let j = await articleRequest.json();
    let i = await imagesRequest.json();

    let artsRequest = await fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations.contains%3A(%22New%20YOrk%20City%22)%20AND%20section_name%3A(%22arts%22)&begin_date=20160624&sort=newest&fl=web_url%2C%20snippet%2C%20lead_paragraph%2C%20source%2C%20multimedia%2C%20headline%2C%20byline%2C%20keywords%2C%20pub_date%2C%20news_desk&hl=false&page=1&facet_filter=false&api-key=S8ypx5c7NLX1TqP1GQo3ItYVam7o60qE")
    let a = await artsRequest.json();
 
    let styleRequest = await fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name%3A(%22style%22)&begin_date=20160624&sort=newest&fl=web_url%2C%20snippet%2C%20lead_paragraph%2C%20source%2C%20multimedia%2C%20headline%2C%20byline%2C%20keywords%2C%20pub_date%2C%20news_desk&hl=false&page=1&facet_filter=false&api-key=S8ypx5c7NLX1TqP1GQo3ItYVam7o60qE")
    let s = await styleRequest.json();
 
    let foodRequest = await fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name%3A(%22food%22)&begin_date=20160624&sort=newest&fl=web_url%2C%20snippet%2C%20lead_paragraph%2C%20source%2C%20multimedia%2C%20headline%2C%20byline%2C%20keywords%2C%20pub_date%2C%20news_desk&hl=false&page=1&facet_filter=false&api-key=S8ypx5c7NLX1TqP1GQo3ItYVam7o60qE")
    let f = await foodRequest.json();
 
    return {
      articleGroups: j.groups,
      imageGroups: i.groups,
      initialLongitude: Number(query.longitude),
      initialLatitude: Number(query.latitude),
      artsArticles: a.response.docs,
      styleArticles: s.response.docs,
      foodArticles: f.response.docs
    };
  }

  onSelected(viewport, item) {
    console.log(viewport, item)
    this.setState({
      initialLatitude: viewport.latitude,
      initialLongitude: viewport.longitude
    })
  }

  viewportChangeHandler(viewport) {
    this.setState({
      initialLatitude: viewport.latitude,
      initialLongitude: viewport.longitude,
    })
  }

  render() {
    return (
      <Layout title="Results">
        <div className="resultBackground">
          <div className="hero">
            <Header title="NYT Explore">
              <SearchBar viewport={this.state.viewport} onSelected={this.onSelected} token={token}></SearchBar>
            </Header>
          </div>
          <Container id="content">
            <Row className="justify-content-center results-row">
              <Col style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }} md={5}>
                <div className={"collapse" + (this.state.collapse1 ? '-false' : '')}>
                  <div className='tempContent'>
                    <Result
                      header="Events"
                      type="events"
                      onClick={this.initial}
                      subheader="Events"
                      notes={jNotesEvents}>
                      {events.map(obj => (
                          <a href={obj.link}>
                            <img className="img-scroll" src={obj.image}/>
                          </a>
                        ))}
                      </Result>
                  </div>
                </div>

                <div className={"collapse" + (this.state.collapse2 ? '-false' : '')}>
                  <div className='tempContent'>
                    <Result
                      header="Style"
                      type="style"
                      onClick={this.initial}
                      articles={this.props.styleArticles}
                      subheader="Images"
                      notes={jNotesStyle}>
                        {styleCarousel.map(imageurl => (
                            <img style={smallerPic} className="img-scroll" src={imageurl}/>
                        ))}
                      </Result>
                  </div>
                </div>

                <div className={"collapse" + (this.state.collapse3 ? '-false' : '')}>
                  <div className='tempContent'>
                    <Result
                      header="Arts"
                      type="arts"
                      articles={this.props.artsArticles}
                      onClick={this.initial}
                      subheader="Images"
                      notes={jNotesArts}>
                        {artworks.map(imageurl => (
                            <img style={smallerPic} className="img-scroll" src={imageurl}/>
                        ))}
                      </Result>
                  </div>
                </div>

                <div className={"collapse" + (this.state.collapse4 ? '-false' : '')}>
                  <div className='tempContent'>
                    <Result
                      onClick={this.initial}
                      header="Food"
                      type="food"
                      articles={this.props.foodArticles}
                      subheader="Recipes"
                      notes={jNotesFood}>
                        {foodCarousel.map(obj => (
                            <a href={obj.link}>
                                <img style={smallerPic} className="img-scroll" src={obj.image}/>
                            </a>
                        ))}
                      </Result>
                  </div>
                </div>

                <Row style={{ marginBottom: 25 }}>
                  <Col>
                    <div className={"expand" + (this.state.display)}>
                      <div className='categoryContainer'>
                        <img className="img-fluid" src='../static/eventscategory.svg' />
                        <p onClick={this.expandS1}>Events</p>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className={"expand" + (this.state.display)}>
                      <div className='categoryContainer'>
                        <img className="img-fluid" src='../static/stylecategory.svg' />
                        <p onClick={this.expandS2}>Style</p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className={"expand" + (this.state.display)}>
                      <div className='categoryContainer'>
                        <img className="img-fluid" src='../static/artscategory.svg' />
                        <p onClick={this.expandS3}>Arts</p>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className={"expand" + (this.state.display)}>
                      <div className='categoryContainer'>
                        <img className="img-fluid" src='../static/foodcategory.svg' />
                        <p onClick={this.expandS4}>Food</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={7} className="mapglContainer">
                <Mapbox
                  token={token}
                  viewport={{
                    latitude: this.state.initialLatitude,
                    longitude: this.state.initialLongitude,
                  }}
                  imageGroups={this.props.imageGroups}
                  articleGroups={this.props.articleGroups}
                  onViewportChange={this.viewportChangeHandler} />
              </Col>
            </Row>
          </Container>
          <div className="nytLogo">
            <img src='../static/nytfull.png' />
          </div>
        </div>
      </Layout>
    )
  }
}
