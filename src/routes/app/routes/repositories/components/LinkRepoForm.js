import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import repository from 'actions/repository.js';
import instances from 'actions/instance.js';
import {
  GET_INSTANCES,
  GET_REPOSITORIES,
  LINK_REPOSITORY,
  UPDATE_FIELD_REPOSITORY,
} from 'constants/ActionTypes.js';
import RaisedButton from 'material-ui/RaisedButton';
import Errors from 'components/forms/Errors.js';


const mapStateToProps = state => ({
  auth: state.auth,
  repository: state.repository,
});

const mapDispatchToProps = dispatch => ({
  linkRepository: (owner, repo, token) => dispatch({
    type: LINK_REPOSITORY,
    payload: repository.linkRepository(owner, repo, token),
  }).then(() => {
    dispatch({
      type: GET_INSTANCES,
      payload: instances.getInstances(token)
    });
    dispatch({
      type: GET_REPOSITORIES,
      payload: repository.getRepositories(token)
    });
  }),
  onChangeOwner: (value) => dispatch({
    type: UPDATE_FIELD_REPOSITORY,
    key: 'owner', value,
  }),
  onChangeRepo: (value) => dispatch({
    type: UPDATE_FIELD_REPOSITORY,
    key: 'repository', value,
  }),
});


class LinkRepoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <form onSubmit={this.props.onSubmit} role="form">
        <Errors error={this.props.repository.error}/>
        <div className={'form-group' + (this.props.repository.errors.owner.length > 0 ? ' has-danger' : '')}>
          <label htmlFor="repoOwnerField">Repository Owner</label>
          <input
            type="text"
            onChange={this.props.changeOwner}
            value={this.props.repository.owner || ''}
            className="form-control"
            id="repoOwnerField"
            placeholder="Enter Repository Owner" />
          <Errors errors={this.props.repository.errors.owner}/>
        </div>
        <div className={'form-group' + (this.props.repository.errors.repository.length > 0 ? ' has-danger' : '')}>
          <label htmlFor="repoNameField">Repository Name</label>
          <input
            type="text"
            onChange={this.props.changeRepo}
            value={this.props.repository.repository || ''}
            className="form-control"
            id="repoNameField"
            placeholder="Enter Repository Name" />
          <Errors errors={this.props.repository.errors.repository}/>
        </div>
        <RaisedButton
          onClick={this.props.onSubmit}
          label="Link Repository"
          primary
          className="btn-w-md" />
        <div className="divider" />
      </form>
    );
  }
}

class LinkRepo extends React.Component {
  constructor(props) {
    super(props);
    this.changeOwner = ev => this.props.onChangeOwner(ev.target.value);
    this.changeRepo = ev => this.props.onChangeRepo(ev.target.value);
  }

  linkRepository(ev) {
    ev.preventDefault();
    this.props.linkRepository(
      this.props.repository.owner,
      this.props.repository.repository,
      this.props.auth.accessToken,
    )
  }

  render() {
    return(
      <div className="box box-default">
        <div className="box-heading">Link A Repository</div>
        <div className="box-body">
          <LinkRepoForm
            changeOwner={this.changeOwner.bind(this)}
            changeRepo={this.changeRepo.bind(this)}
            repository={this.props.repository}
            onSubmit={this.linkRepository.bind(this)} />
        </div>
      </div>
    );
  }
};

module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(LinkRepo));
