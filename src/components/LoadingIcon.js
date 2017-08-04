import React from 'react';
import loading from '../static/images/loading.gif';


class LoadingIcon extends React.Component {

  render() {
    return <img alt='loading...' className='app-loading' src={loading} />;
  }
}


export default LoadingIcon;
