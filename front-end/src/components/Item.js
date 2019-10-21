import React from 'react';
import { Paper, Typography, IconButton } from '@material-ui/core';
import ModalForm from './ModalForm';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { observer } from "mobx-react"
import ItemForm from './ItemForm';
import { useStyles } from '../styles';

export default observer(({ item, editItemState, save, handleClick, remove, cats }) => {
  const classes = useStyles();
  return (
  <Paper className={classes.paper + ' ' + classes.item}>
    <Typography variant="h5" gutterBottom>
      {item.label}
    </Typography>
    <div className={classes.buttonPanel}>
      <ModalForm
        save={save}
        button={handleClickOpen => (
          <IconButton
            onClick={()=>handleClick(handleClickOpen)}
            aria-label="edit"
            color="primary">
            <EditIcon />
          </IconButton>
        )} title="Edit item" description="">
        <ItemForm newItemState={editItemState} cats={cats} />
      </ModalForm>
      <ModalForm
        save={remove}
        button={handleClickOpen => (
          <IconButton onClick={handleClickOpen} aria-label="delete" color="primary">
            <DeleteIcon />
          </IconButton>
        )} title="Delete category" description="Are you sure?">
      </ModalForm>
    </div>
  </Paper>)})