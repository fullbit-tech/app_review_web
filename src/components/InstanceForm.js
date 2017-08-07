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
      instance_state = this.props.instance.instance.instance_state || 'N/A';
      if (this.props.instance.instance.instance_url) {
        instance_url = <a href={"http://" + this.props.instance.instance.instance_url}
                          target='_blank'>{this.props.instance.instance.instance_url}</a>
      } else {
        < div>Instance URL: N/A</div>
      }
    }

    return(
      <div>
        <h3>Instance</h3>
        <div>
          Instance Size: {<InstanceSizeSelect
            changeSize={this.props.changeSize}
            selected={this.props.instance.instance.instance_size}
            disabled={this.props.instance.instance.instance_id !== undefined} />
          }
          <Errors errors={this.props.instance.errors.instance_size} />
        </div>
        <div>
          Instance Recipe: {<InstanceRecipeSelect
            changeRecipe={this.props.changeRecipe}
            recipes={this.props.recipes}
            selected={this.props.instance.instance.recipe_id}
            disabled={this.props.instance.instance.instance_id !== undefined}
          />}
          <Errors errors={this.props.instance.errors.recipe_id} />
        </div>
        <div>Instance State: {instance_state}</div>
        <div>Instance URL: {instance_url}</div>
      {this.props.instance.instance.instance_state === 'running' &&
        <div>
          <button
            className='btn btn-warning btn-default'
            onClick={this.props.stopInstance}>Stop Instance
          </button>
        </div>
      }
      {this.props.instance.instance.instance_state !== 'running' &&
        <div>
          <button
            className='btn btn-primary btn-default'
            onClick={this.props.startInstance}>Start Instance
          </button>
        </div>
      }
      {this.props.instance.instance.instance_state &&
        <div>
          <button
            className='btn btn-danger btn-default'
            onClick={this.props.terminateInstance}>Terminate Instance
          </button>
        </div>
      }
      </div>
    );
  }
}


export default (InstanceForm);
