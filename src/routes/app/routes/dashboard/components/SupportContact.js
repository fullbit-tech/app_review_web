import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import message from 'actions/message.js';
import Errors from 'components/forms/Errors';
import {
  SEND_SUPPORT_MESSAGE,
  UPDATE_FIELD_SUPPORT_CONTACT_FORM,
} from 'constants/ActionTypes.js';
import RaisedButton from 'material-ui/RaisedButton';


const mapStateToProps = state => ({
  auth: state.auth,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  sendSupportMessage: (body, token) => dispatch({
    type: SEND_SUPPORT_MESSAGE,
    payload: message.sendSupportMessage(body, token),
  }),
  onChangeBody: (value) => dispatch({
    type: UPDATE_FIELD_SUPPORT_CONTACT_FORM,
    key: 'body', value,
  }),
});


class SupportContactForm extends React.Component {

  render() {
    return(
      <form onSubmit={this.props.onSubmit} role="form">
        <Errors error={this.props.message.error}/>
        <div className={'form-group' + (this.props.message.errors.body.length > 0 ? ' has-danger' : '')}>
          <label htmlFor="messageField">Message</label>
          <textarea
            onChange={this.props.onChangeBody}
            value={this.props.message.body || ''}
            className="form-control"
            id="messageField"
            rows='23'
            placeholder="Please explain, in detail, the issue you are having" />
          <Errors errors={this.props.message.errors.body}/>
        </div>
        <RaisedButton
          onClick={this.props.onSubmit}
          label="Submit"
          primary
          className="btn-w-md" />
        <div className="divider" />
      </form>
    );
  }
}


class SupportContact extends React.Component {
  constructor(props) {
    super(props);
    this.changeBody = ev => this.props.onChangeBody(ev.target.value);
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.sendSupportMessage(
      this.props.message.body,
      this.props.auth.accessToken,
    )
  }

  render() {
    return(
      <div className="box box-default">
        <div className="box-heading">Support Contact</div>
        <div className="box-body">
          <SupportContactForm
            message={this.props.message}
            onSubmit={this.onSubmit.bind(this)}
            onChangeBody={this.changeBody.bind(this)} />
        </div>
      </div>
    );
  }
}

module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(SupportContact));
