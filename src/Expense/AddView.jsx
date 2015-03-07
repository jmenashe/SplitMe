'use strict';

var React = require('react');
var mui = require('material-ui');
var AppBar = mui.AppBar;
var AppCanvas = mui.AppCanvas;
var IconButton = mui.IconButton;
var FlatButton = mui.FlatButton;

var Detail = require('./DetailView');
var action = require('./action');

var AddView = React.createClass({

  onTouchTapClose: function() {
    action.tapClose();
  },

  onTouchTapSave: function() {
    action.tapSave();
  },

  render: function () {
    return <AppCanvas predefinedLayout={1}>
      <AppBar title="New expense"
        showMenuIconButton={true}
        iconClassNameLeft="md-close"
        onMenuIconButtonTouchTap={this.onTouchTapClose}>
          <FlatButton label="Save" className="expense-save" onTouchTap={this.onTouchTapSave}/>
      </AppBar>
      <div className="mui-app-content-canvas">
        <Detail expense={this.props.expenseCurrent}/>
      </div>
    </AppCanvas>;
  }
});

module.exports = AddView;
