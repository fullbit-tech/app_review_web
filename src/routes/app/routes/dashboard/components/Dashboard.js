import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Instances } from '../../instances/components/Instances';
import AccountUsage from './AccountUsage';
import LinkRepoForm from '../../repositories/components/LinkRepoForm';
import Articles from './Articles';
import SupportContact from './SupportContact';
import { connect } from 'react-redux';


class Engagement extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="col-xl-6">
          <Articles articles={[{id: 1}]} />
        </div>
        <div className="col-xl-6">
          <SupportContact />
        </div>
      </div>
    )
  }
}

class Dashboard extends React.Component {
  render() {
    return(
      <div className="container-fluid no-breadcrumbs page-dashboard">
        <QueueAnim type="bottom" className="ui-animate">
          <div className="row">
            <div className="col-xl-6">
              <AccountUsage />
            </div>
            <div className="col-xl-6">
              <LinkRepoForm />
            </div>
          </div>
          <Instances />
          <div key="3"><Engagement /></div>
        </QueueAnim>
      </div>
    );
  }
}

module.exports = Dashboard;
