import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import repository from '../../actions/repository.js';
import {
  GET_REPOSITORIES,
  LINK_REPOSITORY,
  UNLINK_REPOSITORY,
  UPDATE_FIELD_REPOSITORY,
} from '../../constants/actionTypes.js';
import Errors from '../Errors.js';


const mapStateToProps = state => ({
  auth: state.auth,
  repository: state.repository,
  repositories: state.repositories,
});

const mapDispatchToProps = dispatch => ({
  getRepositories: (token) => dispatch({
      type: GET_REPOSITORIES,
      payload: repository.getRepositories(token),
  }),
  linkRepository: (owner, repo, token) => dispatch({
    type: LINK_REPOSITORY,
    payload: repository.linkRepository(owner, repo, token),
  }).then(() => {
    dispatch({
      type: GET_REPOSITORIES,
      payload: repository.getRepositories(token)
    });
  }),
  unlinkRepository: (owner, repo, token) => dispatch({
    type: UNLINK_REPOSITORY,
    payload: repository.unlinkRepository(owner, repo, token),
  }).then(() => {
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

class Repository extends React.Component {
  constructor(props) {
    super(props);
    this.changeOwner = ev => this.props.onChangeOwner(ev.target.value);
    this.changeRepo = ev => this.props.onChangeRepo(ev.target.value);
  }

  componentWillMount() {
    this.props.getRepositories(this.props.auth.accessToken);
  }

  linkRepository(ev) {
    ev.preventDefault();
    this.props.linkRepository(
      this.props.repository.owner,
      this.props.repository.repository,
      this.props.auth.accessToken,
    )
  }

  unlinkRepository(owner, repo, ev) {
    ev.preventDefault();
    if (window.confirm('Unlink Repository?') === true) {
      this.props.unlinkRepository(
        owner, repo, this.props.auth.accessToken)
    }
  }

  render() {
    var _this = this;
    var repositories = this.props.repositories.map(function(repo, i) {
      return <li key={i}>
        <div className="txt">
          {repo.owner + '/' + repo.repository}
          <a href="" onClick={_this.unlinkRepository.bind(_this, repo.owner, repo.repository)} className="red repo-unlink glyphicon glyphicon-remove"></a>
        </div>
      </li>
    });
    return(
      <div className='container-fluid'>
        <h1>Recipes</h1>
        <hr/>
        <div className="row">
          <div className='col-md-6'>
            <div className="widget-box">
              <div className="widget-title">
                <h3>Linked Repositories</h3>
              </div>
              <div className="widget-content">
                <div>
                  <ul>{repositories}</ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="widget-box">
              <div className="widget-title">
                <h3>Link A Repository</h3>
              </div>
              <div className="widget-content">
                <form id='repository-form' onSubmit={this.linkRepository.bind(this)}>
                  <Errors error={this.props.repository.error}/>
                  <div className={'form-group' + (this.props.repository.errors.owner.length > 0 ? ' has-error' : '')}>
                    <label htmlFor='repository_owner'>Repository Owner:</label>
                    <input className='form-control' onChange={this.changeOwner} value={this.props.repository.owner || ''} type='text' name='repository_owner' id='repository_owner' />
                    <Errors errors={this.props.repository.errors.owner}/>
                  </div>
                  <div className={'form-group' + (this.props.repository.errors.repository.length > 0 ? ' has-error' : '')}>
                    <label htmlFor='repository_repo'>Repository Name:</label>
                    <input className='form-control' onChange={this.changeRepo} value={this.props.repository.repository || ''} type='text' name='repository_repo' id='repository_repo' />
                    <Errors errors={this.props.repository.errors.repository}/>
                  </div>
                  <div className='form-group'>
                    <input className='btn btn-default' type='submit' name='link' value='link' id='Link' />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Repository));
