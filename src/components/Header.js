import React from 'react';
import auth from '../actions/auth.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UNLOAD_USER_DATA, LOGOUT } from '../constants/actionTypes.js';


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
      <header>
        <h1 className="logo"><a href="/">{logo}</a></h1>
        <div className="nav">
          <div className="welcome">{this.props.user.user ? <div>Welcome, {this.props.user.user.email}</div> : ''}</div>
          {this.props.auth.accessToken ? <button onClick={this.props.logout} className='btn btn-default'>Log out</button> : ''}
          {!this.props.auth.accessToken ? <Link className='btn btn-default' to='/login'>Log in</Link> : ''}
          {!this.props.auth.accessToken && !this.props.user.userRegistered  ? <Link className='btn btn-default' to='/register'>Register</Link> : ''}
        </div>
      </header>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);


