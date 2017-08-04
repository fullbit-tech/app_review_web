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
        <select onChange={this.props.changeSize} value={this.props.selected || ''} disabled={this.props.disabled}>
          <option value=''>--</option>
          {options}
        </select>);
  };
}


export default InstanceSizeSelect;
