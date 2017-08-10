import React from 'react';


class Settings extends React.Component{

  render(){
    return(
      <div id='settings'>
        {this.props.children}
      </div>
    );
  }
}


export default Settings;
