import React from 'react';
import { Paper, Typography, IconButton } from '@material-ui/core';
import ModalForm from './ModalForm';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { observer } from "mobx-react"
import ItemForm from './ItemForm';
import { useStyles } from '../styles';
import EditDeletePanel from './EditDeletePanel';

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
                        handleClick={(handleClickOpen)=>handleClick(handleClickOpen)}
                        onEdit={save}
                        onDelete={remove}>
                        <ItemForm newItemState={editItemState} cats={cats} />
                      </EditDeletePanel>


      
    </div>
  </Paper>)})