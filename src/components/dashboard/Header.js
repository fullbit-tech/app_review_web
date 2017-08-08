import React from 'react';
import auth from '../../actions/auth.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UNLOAD_USER_DATA, LOGOUT } from '../../constants/actionTypes.js';


const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch({ type: LOGOUT, payload: auth.logout() });
    dispatch({ type: UNLOAD_USER_DATA, });
  }
});

class Header extends React.Component{


  render(){
    const logo = 'App Review';
    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">App Review</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/instances">Instances <span className="sr-only">(current)</span></Link></li>
              <li><Link to="/recipes">Recipes</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Welcome, {this.props.user.user.email} <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><Link to="/user">Profile</Link></li>
                  <li><Link to="/accounting">Accounting</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="" onClick={this.props.logout}>Log Out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);


