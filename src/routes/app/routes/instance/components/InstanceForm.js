import React from 'react';


class InstanceSizeSelect extends React.Component {

  instanceSizes = [
    't2.micro',
    't2.small',
    't2.medium',
    't2.large',
    't2.xlarge',
    't2.2xlarge',
  ];

  render(){
    var options = this.instanceSizes.map((size) =>
        <option value={size} key={size}>{size}</option>
      );
    return(
        <select className="form-control" onChange={this.props.changeSize} value={this.props.selected || ''} disabled={this.props.disabled}>
          <option value=''>--</option>
          {options}
        </select>
    );
  }
}

class InstanceRecipeSelect extends React.Component {

  render(){
    var options = this.props.recipes.map((recipe) =>
        <option value={recipe.id} key={recipe.id}>{recipe.name}</option>
    );
    return(
        <select className="form-control" onChange={this.props.changeRecipe} value={this.props.selected || ''} disabled={this.props.disabled}>
          <option value=''>--</option>
          {options}
        </select>
    );
  }
}


class InstanceForm extends React.Component {

  render() {
    var instance_state, instance_url;

    instance_state = this.props.instance_state || 'Dormant';
    if (this.props.instance.instance_url) {
      instance_url = <a href={"http://" + this.props.instance.instance_url}
                        target='_blank'>{this.props.instance.instance_url}</a>
    } else {
      instance_url = "Unavailable";
    }

    return(
      <form className="form-horizontal">
        <div className='form-group'>
          <label className="control-label col-sm-2">Size</label>
          <div className="col-sm-10">
            <InstanceSizeSelect
              changeSize={this.props.changeSize}
              selected={this.props.instance.instance_size}
              disabled={this.props.instance.instance_id !== undefined} />
          </div>
        </div>
        <div className='form-group'>
          <label className="control-label col-sm-2">Recipe</label>
          <div className="col-sm-10">
            <InstanceRecipeSelect
              changeRecipe={this.props.changeRecipe}
              recipes={this.props.recipes}
              selected={this.props.instance.recipe_id}
              disabled={this.props.instance.instance_id !== undefined}
            />
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
      {this.props.instance.instance_state === 'running' &&
        <div className="form-group">
          <div className="col-sm-10 noinput">
            <button
              className='btn btn-warning btn-default'
              disabled={this.props.instance.loading}
              onClick={this.props.stopInstance}>Stop Instance
            </button>
          </div>
        </div>
      }
      {this.props.instance_state !== 'running' &&
        <div className="form-group">
          <div className="col-sm-10 noinput">
            <button
              className='btn btn-primary btn-default'
              disabled={this.props.instance.loading}
              onClick={this.props.startInstance}>Start Instance
            </button>
          </div>
        </div>
      }
      {this.props.instance.instance_state &&
        <div className="form-group">
          <div className="col-sm-10 noinput">
            <button
              className='btn btn-danger btn-default'
              disabled={this.props.instance.loading}
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

