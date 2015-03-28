'use strict';

var React = require('react');
var mui = require('material-ui');
var AppBar = mui.AppBar;
var AppCanvas = mui.AppCanvas;
var IconButton = mui.IconButton;
var FlatButton = mui.FlatButton;
var Dialog = mui.Dialog;

var Detail = require('./DetailView');
var action = require('../action');
var expenseAction = require('./action');

var AddView = React.createClass({
  propTypes: {
    expense: React.PropTypes.object.isRequired,
    pageDialog: React.PropTypes.string.isRequired,
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.hasOwnProperty('pageDialog')) {
      this.updateDialog(this.props.pageDialog, nextProps.pageDialog);
    }
  },

  updateDialog: function(from, to) {
    if(from !== to) {
      this.dontAction = true;
      var deleteDialog = this.refs.deleteDialog;

      switch(from) {
        case 'delete':
          deleteDialog.dismiss();
          break;
      }

      switch(to) {
        case 'delete':
          deleteDialog.show();
          break;
      }
      this.dontAction = false;
    }
  },

  onTouchTapClose: function(event) {
    event.preventDefault();
    expenseAction.tapClose();
  },

  onTouchTapSave: function(event) {
    event.preventDefault();
    expenseAction.tapSave();
  },

  onTouchTapDelete: function() {
    action.showDialog('delete');
  },

  onTouchTapDialogOK: function() {
    expenseAction.tapDelete(this.props.expense);
    action.dismissDialog();
  },

  onDismiss: function() {
    if(!this.dontAction) {
      action.dismissDialog();
    }
  },

  render: function () {
    var expense = this.props.expense;
    var title;
    var bottom;
    var className = 'mui-app-content-canvas';
    var deleteDialog;

    if(expense._id) {
      title = 'Edit expense';
      className += ' button-bottom-padding';
      bottom = <div className="button-bottom">
        <FlatButton label="DELETE" onTouchTap={this.onTouchTapDelete} />
      </div>;

      var dialogTitle = '';
      var actions = [
        { text: 'Cancel' },
        { text: 'OK', onClick: this.onTouchTapDialogOK }
      ];
      deleteDialog = <Dialog title={dialogTitle} ref="deleteDialog" actions={actions}
        onDismiss={this.onDismiss}>
        <div className="mui-font-style-subhead-1">Delete this expense?</div>
      </Dialog>;
    } else {
      title = 'New expense';
    }

    return <AppCanvas predefinedLayout={1}>
      <AppBar title={title}
        showMenuIconButton={true}
        iconClassNameLeft="md-close"
        onMenuIconButtonTouchTap={this.onTouchTapClose}>
          <FlatButton label="Save" className="expense-save" onTouchTap={this.onTouchTapSave}/>
      </AppBar>
      <div className={className}>
        <Detail expense={this.props.expense} pageDialog={this.props.pageDialog} />
      </div>
      {bottom}
      {deleteDialog}
    </AppCanvas>;
  }
});

module.exports = AddView;
