import React from 'react';
import loading from '../static/images/loading.gif';


class LoadingIcon extends React.Component {

  render() {
    var classes = [];
    if (this.props.size == 'small') {
      classes.push('app-loading-small');
    } else {
      classes.push('app-loading-large');
    }
    return <img alt='loading...' className={'app-loading ' + classes}  src={loading} />;
  }
}


export default LoadingIcon;
