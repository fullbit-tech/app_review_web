import React from "react";


class Header extends React.Component{

  logOut() {
    this.props.setLogin(null);
  }

  toggleRegistered(v) {
    this.props.setRegistered(v);
  }

  render(){
    const logo = "App Review";
    return(
      <header>
        <h1>{logo}</h1>
        {this.props.accessToken ? <button onClick={this.logOut.bind(this)}>Logout</button> : ""}
        {!this.props.accessToken ? <button onClick={() => this.toggleRegistered(true)}>Login</button> : ""}
        {!this.props.accessToken ? <button onClick={() => this.toggleRegistered(false)}>Register</button> : ""}
      </header>
    );
  }
}


export default Header;


