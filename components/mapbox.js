import React, {Component} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

export default class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        height: 600,
        zoom: 13,
        pitch: 30,
        ...this.props.viewport
      },
      popupInfo: null,
      imagePopupInfo: null
    };
    this.renderPopup = this.renderPopup.bind(this)
  }

  renderPopup() {
    if (this.state.popupInfo) {
      return (
        <Popup tipSize={5}
          anchor="bottom-right"
          longitude={this.state.popupInfo.longitude}
          latitude={this.state.popupInfo.latitude}
          onClose={() => this.setState({popupInfo: null})}
          closeOnClick={true}
          captureScroll={true}>

          <div className="article-popup-list">
            {this.state.popupInfo.articles.map((article) => {

              let mapsLink = "https://www.google.com/maps/dir/?api=1"
              mapsLink += `&origin=40.7559868,-73.9909178`
              mapsLink += `&destination=${this.state.popupInfo.latitude},${this.state.popupInfo.longitude}`
              return (
                <div className="article-popup-list-item">
                  <div className="article-popup-img-container">
                    <img className="img-fluid" src={"https://nytimes.com/" + article.imageSmall}></img>
                  </div>
                  <div className="article-popup-list-item-info">
                    <h2>{article.headline}</h2>
                    <p>{article.snippet}</p>
                    <a className="article-popup-article-link" target="_blank" href={article.url}>Read article</a>
                    <a className="article-popup-directions-link" target="_blank" href={mapsLink}>Directions</a>
                  </div>
                </div> )
              })
            }
          </div>
        </Popup>
      )
    } else if (this.state.imagePopupInfo) {
      return (
        <Popup tipSize={5}
          anchor="bottom-right"
          longitude={this.state.imagePopupInfo.longitude}
          latitude={this.state.imagePopupInfo.latitude}
          onClose={() => this.setState({imagePopupInfo: null})}
          closeOnClick={true}
          captureScroll={true}>

          <div className="article-popup-list">
            {this.state.imagePopupInfo.images.map((image) => {
              let d = new Date(image.dateTaken);
              let mapsLink = "https://www.google.com/maps/dir/?api=1"
              mapsLink += `&origin=40.7559868,-73.9909178`
              mapsLink += `&destination=${this.state.imagePopupInfo.latitude},${this.state.imagePopupInfo.longitude}`
              return (
                <div className="article-popup-list-item">
                  <div className="article-popup-img-container">
                    <img className="img-fluid" src={image.url}></img>
                  </div>
                  <div className="article-popup-list-item-info">
                    <h2>{image.caption.substring(0, 40)}</h2>
                    <p>{image.byLine}</p>
                    <p>{d.toDateString()}</p>
                    <a className="article-popup-directions-link" target="_blank" href={mapsLink}>Directions</a>
                  </div>
                </div>
              )})
            }
          </div>
        </Popup>
      )
    }
  }

  renderArticleMarkers = (group, index) => {
    const backgroundMarker = {
      backgroundImage: 'url(../static/placeholder.png)'
    };
    return (
      <Marker
        key={"marker-" + index}
        longitude={group.coordinates.lng}
        latitude={group.coordinates.lat} >
        <div className="article-marker" style={backgroundMarker} onClick={() => {
          if (this.state.popupInfo || this.state.imagePopupInfo) {
            this.setState({
              popupInfo: null,
              imagePopupInfo: null
            })
          } else {
            this.setState({
              popupInfo: {
                longitude: group.coordinates.lng,
                latitude: group.coordinates.lat,
                articles: group.markers
              }
            })
          }
        }}>
        </div>
      </Marker>
    )
  }

  renderImageMarkers = (group, index) => {
    const backgroundMarker = {
      backgroundImage: 'url(../static/pin.svg)'
    };
    return (
      <Marker
        key={"marker-" + index}
        longitude={group.coordinates.lng}
        latitude={group.coordinates.lat} >

        <div className="article-marker" style={backgroundMarker} onClick={() => {
          if (this.state.popupInfo || this.state.imagePopupInfo) {
            this.setState({
              popupInfo: null,
              imagePopupInfo: null
            })
          } else {
            this.setState({
              imagePopupInfo: {
                longitude: group.coordinates.lng,
                latitude: group.coordinates.lat,
                images: group.markers
              }
            })
          }
        }}>
        </div>

      </Marker>
    )
  }

  render() {
    let v = {...this.state.viewport, ...this.props.viewport}

    return (
      <ReactMapGL
        {...v}
        mapboxApiAccessToken={this.props.token}
        onViewportChange={(viewport) => {
          this.setState({viewport})
          this.props.onViewportChange(viewport)
        }} >
        {this.renderPopup()}
        {this.props.articleGroups.map(this.renderArticleMarkers)}
        {this.props.imageGroups.map(this.renderImageMarkers)}
      </ReactMapGL>
    );
  }
}
