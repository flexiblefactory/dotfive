import { Paper, Typography } from '@material-ui/core';
import { observer } from "mobx-react";
import React from 'react';
import { useStyles } from '../styles';
import EditDeletePanel from './EditDeletePanel';
import ItemForm from './ItemForm';

export default observer(({ item, editItemState, save, handleClick, remove, cats }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper + ' ' + classes.item}>
      <Typography variant="h5" gutterBottom>
        {item.label}
      </Typography>
      <div className={classes.buttonPanel}>
        <EditDeletePanel
          title="Delete item"
          handleClick={(handleClickOpen) => handleClick(handleClickOpen)}
          onEdit={save}
          onDelete={remove}>
          <ItemForm newItemState={editItemState} cats={cats} />
        </EditDeletePanel>
      </div>
    </Paper>)
})