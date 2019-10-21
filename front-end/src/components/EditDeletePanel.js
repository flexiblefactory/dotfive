import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { observer } from "mobx-react";
import React from 'react';
import ModalForm from './ModalForm';
import { useStyles } from '../styles';

const EditDeletePanel = observer(
  ({ onEdit, onDelete, title, children, handleClick }) => {
    const classes = useStyles();

    return (
      <div className={classes.buttonPanel}>
        <ModalForm
          save={onEdit}
          button={handleClickOpen => (
            <IconButton
              onClick={()=>handleClick(handleClickOpen)}
              aria-label="edit"
              color="primary">
              <EditIcon />
            </IconButton>
          )} title="Edit item" description="">
          {children}
        </ModalForm>
        <ModalForm
          save={onDelete}
          button={handleClickOpen => (
            <IconButton onClick={handleClickOpen} aria-label="delete" color="primary">
              <DeleteIcon />
            </IconButton>
          )} title={title} description="Are you sure?">
        </ModalForm>
      </div>
      )
  }
);
export default EditDeletePanel;