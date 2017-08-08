import React from 'react';
import InstanceSizeSelect from './InstanceSizeSelect.js';
import InstanceRecipeSelect from './InstanceRecipeSelect.js';
import Errors from './Errors.js';
import LoadingIcon from './LoadingIcon.js';


class InstanceForm extends React.Component {

  render() {
    var instance_state, instance_url;

    if (this.props.instance.loading) {
      instance_state = <LoadingIcon size='small'/>;
      instance_url = <LoadingIcon size='small'/>;
    } else {
      instance_state = this.props.instance.instance.instance_state || 'Inactive';
      if (this.props.instance.instance.instance_url) {
        instance_url = <a href={"http://" + this.props.instance.instance.instance_url}
                          target='_blank'>{this.props.instance.instance.instance_url}</a>
      } else {
        instance_url = "Unavailable"
      }
    }

    return(
      <form className="form-horizontal">
        <div className={'form-group' + (this.props.instance.errors.instance_size.length > 0 ? ' has-error' : '')}>
          <label className="control-label col-sm-2">Size</label>
          <div className="col-sm-10">
            <InstanceSizeSelect
              changeSize={this.props.changeSize}
              selected={this.props.instance.instance.instance_size}
              disabled={this.props.instance.instance.instance_id !== undefined} />
            <Errors errors={this.props.instance.errors.instance_size} />
          </div>
        </div>
        <div className={'form-group' + (this.props.instance.errors.recipe_id.length > 0 ? ' has-error' : '')}>
          <label className="control-label col-sm-2">Recipe</label>
          <div className="col-sm-10">
            <InstanceRecipeSelect
              changeRecipe={this.props.changeRecipe}
              recipes={this.props.recipes}
              selected={this.props.instance.instance.recipe_id}
              disabled={this.props.instance.instance.instance_id !== undefined}
            />
            <Errors errors={this.props.instance.errors.recipe_id} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">State</label>
          <div className="col-sm-10 noinput">
            <div>{instance_state}</div>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2 noinput">URL</label>
          <div className="col-sm-10 noinput">
            <div>{instance_url}</div>
          </div>
        </div>
      {this.props.instance.instance.instance_state === 'running' &&
        <div className="form-group">
          <div className="col-sm-10 noinput">
            <button
              className='btn btn-warning btn-default'
              onClick={this.props.stopInstance}>Stop Instance
            </button>
          </div>
        </div>
      }
      {this.props.instance.instance.instance_state !== 'running' &&
        <div className="form-group">
          <div className="col-sm-10 noinput">
            <button
              className='btn btn-primary btn-default'
              onClick={this.props.startInstance}>Start Instance
            </button>
          </div>
        </div>
      }
      {this.props.instance.instance.instance_state &&
        <div className="form-group">
          <div className="col-sm-10 noinput">
            <button
              className='btn btn-danger btn-default'
              onClick={this.props.terminateInstance}>Terminate Instance
            </button>
          </div>
        </div>
      }
      </form>
    );
  }
}


export default (InstanceForm);
