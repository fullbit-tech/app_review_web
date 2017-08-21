import React from 'react';


class Errors extends React.Component {

  render() {
    var _errors = [];
    var _error = '';

    if (this.props.errors) {
      _errors = this.props.errors;
    }
    if (this.props.error) {
      _error = this.props.error;
    }
    return(
      <div className='errorBox'>
        <div className='form-control-feedback form-error'>
          {_error}
        </div>
        <div className='field-errors'>
          {_errors.map(function(obj, i){
             return <span key='i' className='form-control-feedback field-error'>{obj}</span>
           })}
        </div>
      </div>
    );
  }
}

export default Errors;

