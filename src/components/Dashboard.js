import React from 'react';


class Dashboard extends React.Component{

  render(){
    return(
      <div id='content'>
        {this.props.children}
      </div>
    );
  }
}


export default Dashboard;


