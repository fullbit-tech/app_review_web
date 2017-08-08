import React from 'react';


class InstanceRecipeSelect extends React.Component {

  render(){
    var options = this.props.recipes.map((recipe) =>
        <option value={recipe.id} key={recipe.id}>{recipe.name}</option>
    );
    return(
        <select className="form-control" onChange={this.props.changeRecipe} value={this.props.selected || ''} disabled={this.props.disabled}>
          <option value=''>--</option>
          {options}
        </select>);
  };
}


export default InstanceRecipeSelect;
