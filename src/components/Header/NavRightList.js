import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { hashHistory } from 'react-router';

const ImgIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '50px' // 36 + 16, algin with sub list
};

class NavRightList extends React.Component {

  handleChange = (event, value) => {
    hashHistory.push(value);
  }

  render() {
    return (
      <ul className="list-unstyled float-right">
        <li style={{marginRight: '10px'}}>
          <IconMenu
            iconButtonElement={<IconButton style={ImgIconButtonStyle}><img src={this.props.user.user.github_avatar} alt="" className="rounded-circle img30_30" /></IconButton>}
            onChange={this.handleChange}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            menuStyle={{minWidth: '150px'}}
                    >
            <MenuItem
              value="/app/dashboard"
              primaryText="Dashboard"
              style={{fontSize: '14px', lineHeight: '48px'}}
              innerDivStyle={listItemStyle}
              leftIcon={<i className="material-icons">home</i>}
                        />
            <MenuItem
              value="/app/account/settings"
              primaryText="Settings"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">settings</i>}
                        />
            <MenuItem
              primaryText="Log Out"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">forward</i>}
              onClick={this.props.logout}
                        />
          </IconMenu>
        </li>
      </ul>
    );
  }
}

module.exports = NavRightList;
