import React from 'react';
import {Button} from 'reactstrap';

const backgroundStyle = {
  backgroundImage: 'url(../static/stylecategory.svg)'
};

const backgroundFood = {
  backgroundImage: 'url(../static/foodcategory.svg)'
};

const backgroundEvents = {
  backgroundImage: 'url(../static/eventscategory.svg)'
};

const backgroundArts = {
  backgroundImage: 'url(../static/artscategory.svg)'
};

const Result = (props) => {
  let x;
  let notes;
  switch (props.type) {
    case "food":
      x = backgroundFood
      break;
    case "arts":
      x = backgroundArts
      break;
    case "events":
      x = backgroundEvents
      break;
    case "style":
      x = backgroundStyle
      break;
    default:
      x = backgroundArts
      break;
  }
  
  return (
    <div className="result" style={x}>
      <div className="resultStyling">
        <div className="resultHeader">
          <h2 className="header">{props.header}</h2>
          <Button className='backButton' onClick={props.onClick}>Back</Button>
        </div>
        <div className="resultTransparency">

          <h3 className="sub-header">Journalist's Notes</h3>
            {props.notes.map(note => (
                <div className="journalistNote"> 
                    <p>{note.quote}{note.loc? <i><br/>{note.loc}</i> : <br/>}</p>
                    <div className="journalistTitle">
                        <h5>{note.name}</h5>
                        <h6>{note.title}</h6>
                        <img src={note.picture}/>
                    </div>
                </div>
            ))}

          {props.header=='Events'? <div/> :<h3>Articles</h3>}
          <div className="articles">
            {props.articles && props.articles.map((a, i) => (
              <div key={i} className="article-popup-list-item">
                <div className="article-popup-list-item-info">
                  <h2>{a.headline.main}</h2>
                  <p>{a.snippet.substring(0, 100) + "..."}</p>
                  <a className="article-popup-article-link" target="_blank" href={a.web_url}>Read article</a>
                </div>
              </div> 
            ))}
          </div>

          <h3>{props.subheader}</h3>
          <div className="side-scroll">
            {props.children}
          </div>

        </div>
      </div>
    </div>
  )
}


export { Result };