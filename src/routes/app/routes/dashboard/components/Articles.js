import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CHARTCONFIG from 'constants/ChartConfig';
import APPCONFIG from 'constants/Config';


class Article extends React.Component {

  render() {
    return(
      <div className="card card-white">
        <div className="card-image">
          <img src="assets/images-demo/assets/600_400-1.jpg" alt="" />
          <span className="card-title">Image Card with Icon Button</span>
        </div>
        <div className="card-content">
          <a className="card-button float-right" href="javascript:;">
            <button className="btn btn-icon btn-icon-round btn-floating btn-danger"><i className="material-icons mdi-sm">favorite</i></button>
          </a>
          <p>I am a very simple card. I am good at containing small bits of information.
            I am quite convenient because I require little markup to use effectively.</p>
        </div>
        <div className="card-action">
          <a href="javascript:;">A link</a>
          <a href="javascript:;">A link</a>
        </div>
      </div>
    );
  }
}

class Articles extends React.Component {

  render() {
    var cards = this.props.articles.map((article) => {
      return <Article key={article.id} data={article} />;
    });
    return(
      <div className="box box-default">
        <div className="box-header">Articles</div>
        <div className="box-body">
          {cards}
        </div>
      </div>
    );
  }
}

module.exports = Articles;
