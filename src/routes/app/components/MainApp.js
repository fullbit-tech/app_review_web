import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import Customizer from 'components/Customizer';
import { userIsAuthenticated } from 'containers/auth.js';
import RaisedButton from 'material-ui/RaisedButton';


const mapStateToProps = state => ({...state});

const mWidthStyle = {
  minWidth: '135px'
};

class MainApp extends React.Component {

  render() {
    const { children, location } = this.props;

    return (
      <div className="main-app-container">
        <Sidenav />

        <section id="page-container" className="app-page-container">
          <Header />

          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                {this.props.user.user.github_verified ? (
                  children
                ) : (
                  <div>
                    <div className="call-to-action cta-full-width card-white">
                      <div className="cta-inner">
                        <span className="cta-text">Link your Github account now to get started!</span>
                        <div className="cta-btn">
                          <RaisedButton href={this.props.user.user.github_auth_link} style={mWidthStyle} label="Link Github Account" secondary />
                        </div>
                        <div className="cta-muted"><Link to="/github-usage">Read about how your account will be used.</Link></div>
                      </div>
                    </div>
                    <div className="divider" />
                  </div>
                )}
              </div>
            </div>

            <Footer />
          </div>
        </section>

      </div>
    );
  }
}

module.exports = connect(mapStateToProps)(userIsAuthenticated(MainApp));
