import React, { Component } from 'react';


class PublicHome extends Component {

  render() {
    return(
      <div className='public-home'>
        This is the public Home Page
        {this.props.children}
      </div>
    );
  }
}

export default PublicHome;
