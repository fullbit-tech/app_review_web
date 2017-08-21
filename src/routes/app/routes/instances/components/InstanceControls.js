import React from 'react';
import { Link } from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import LinearProgress from 'material-ui/LinearProgress';


class InstanceList extends React.Component {

  onClickStart(instance, ev) {
    ev.preventDefault();
    this.props.startInstance(instance);
  }

  onClickStop(instance, ev) {
    ev.preventDefault();
    this.props.stopInstance(instance);
  }

  onClickTerminate(instance, ev) {
    ev.preventDefault();
    this.props.terminateInstance(instance);
  }

  stateClass(state) {
    return 'state-' + state;
  }

  powerClass(state) {
    return 'power-' + state;
  }

  render() {
    var _this = this;
    var pullIds = Object.keys(this.props.pull_requests);

    pullIds.reverse()

    var rows = pullIds.map(function(key, i) {
      var pull_request = _this.props.pull_requests[key];
      var instance = _this.props.instances[pull_request.instance];
      var owner = _this.props.pullRequestOwners[pull_request.user];

      if (instance.repository_link !== _this.props.repository.id) {
        return
      }

      return(
        <tr className="instance-control" key={i}>
          <td className="mdl-data-table__cell--non-numeric">
            {pull_request.number}
          </td>
          <td className="pull-owner mdl-data-table__cell--non-numeric">
            <img src={owner.avatar_url} alt="owner" /> {owner.login}
          </td>
          <td className="mdl-data-table__cell--non-numeric">
            {pull_request.title.substring(0, 50)}
          </td>
          <td className="text-center mdl-data-table__cell--non-numeric">
            {instance.loading ? (
              <LinearProgress />
            ) : (
              <span className={_this.stateClass(instance.instance_state)}>
                {instance.instance_state}
              </span>
            )}
          </td>
          <td className="control-btns text-center mdl-data-table__cell--non-numeric">
            {instance.instance_url &&
              <a target="_blank" href={"http://" + instance.instance_url}><i className="material-icons">link</i></a>
            }
            {instance.instance_state === 'running' &&
              <a onClick={_this.onClickStop.bind(_this, instance)} href=""><i className={"material-icons " +  _this.powerClass(instance.instance_state)}>settings_power</i></a>
            }
            {instance.instance_state !== 'running' &&
              <a onClick={_this.onClickStart.bind(_this, instance)} href=""><i className={"material-icons " +  _this.powerClass(instance.instance_state)}>settings_power</i></a>
            }
            {instance.instance_state !== 'dormant' &&
             instance.instance_state !== 'terminated' &&
              <a onClick={_this.onClickTerminate.bind(_this, instance)} href=""><i className="material-icons action-terminate">delete_forever</i></a>
            }
            <Link to={"/app/instance/" + pull_request.id}><i className="action-settings material-icons">settings</i></Link>
          </td>
        </tr>
      )
    });
    return(
      <article className="article">
        <div className="instance-control-box box box-default table-box table-responsive mdl-shadow--2dp">
          <table className="instance-controls-table mdl-data-table">
            <thead>
              <tr>
                <th className="mdl-data-table__cell--non-numeric">Pull Number</th>
                <th className="mdl-data-table__cell--non-numeric">Pull Owner</th>
                <th className="mdl-data-table__cell--non-numeric">Pull Title</th>
                <th className="text-center mdl-data-table__cell--non-numeric">Instance State</th>
                <th className="text-center mdl-data-table__cell--non-numeric">Controls</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </article>
    );
  }
}

module.exports = InstanceList;
