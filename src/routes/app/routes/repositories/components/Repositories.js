import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import repository from 'actions/repository.js';
import CircularProgress from 'material-ui/CircularProgress';
import LinkRepoForm from './LinkRepoForm';
import {
  GET_REPOSITORIES,
  UNLINK_REPOSITORY,
} from 'constants/ActionTypes.js';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';


const mapStateToProps = state => ({
  auth: state.auth,
  repositories: state.repositories,
});

const mapDispatchToProps = dispatch => ({
  getRepositories: (token) => dispatch({
      type: GET_REPOSITORIES,
      payload: repository.getRepositories(token),
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
});


class RepositoriesList extends React.Component {
  componentWillMount() {
    this.props.getRepositories(this.props.auth.accessToken);
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
      return(
        <li key={i}>
          {repo.owner + '/' + repo.repository}
          <IconButton className="delete_link" onClick={_this.unlinkRepository.bind(_this, repo.owner, repo.repository)}><i className="material-icons">clear</i></IconButton>
        </li>
      );
    });
    if (this.props.repositories.loading) {
      return(<div className="col-xl-12 offset-xl-5 app-page-loading"><CircularProgress thickness={6} size={150}/></div>);
    } else {
      return(
        <div className="box box-default">
          <div className="box-header">
            Linked Repositories
          </div>
          <div className="box-body">
            <ul>{repositories}</ul>
          </div>
        </div>
      );
    }
  }
}

const Repositories = connect(mapStateToProps, mapDispatchToProps)(RepositoriesList);


class RepositoryPage extends React.Component {
  render() {
    return(
      <div className="container-fluid no-breadcrumbs page-repositories">
        <QueueAnim type="bottom" className="ui-animate">
          <div className="row">
            <div className="col-xl-6">
              <Repositories />
            </div>
            <div className="col-xl-6">
              <LinkRepoForm />
            </div>
          </div>
        </QueueAnim>
      </div>
    );
  }
}


module.exports = RepositoryPage;
