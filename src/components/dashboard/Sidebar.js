import React from 'react';
import { Link } from 'react-router-dom';


class Sidebar extends React.Component{

  render(){
    return(
      <div>
        <div id="sidebar">
          <ul>
            <li className="active"><Link to="/"><i className="icon icon-home"></i> <span>Dashboard</span></Link> </li>
            <li> <Link to="/instances"><i className="icon icon-cloud"></i> <span>Instances</span></Link> </li>
            <li> <Link to="/recipes"><i className="icon icon-book"></i> <span>Recipes</span></Link> </li>
            <li> <Link to="/settings"><i className="icon icon-cog"></i> <span>Settings</span></Link> </li>
          </ul>
        </div>
      </div>
    );
  }
}


export default Sidebar;


