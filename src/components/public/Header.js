import React from 'react';
import auth from '../../actions/auth.js';
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
    const logo = 'App Sliver';
    return(
      <div>
        <h1>{logo}</h1>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);


