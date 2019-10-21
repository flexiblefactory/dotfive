
import React from 'react';
import { Paper, Typography, IconButton, Button } from '@material-ui/core';
import ModalForm from './ModalForm';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { observer } from "mobx-react"
import ItemForm from './ItemForm';
import { useStyles } from '../styles';
import CategoryForm from './CategoryForm';
export default observer(({ appState, newItemState, children, editCatState, newItem }) => {
  const classes = useStyles();
  const { items, cats } = appState;

  const [editCat, setEditCat] = editCatState;

  return (
    <Paper className={classes.paper + ' ' + classes.category}>
      <ModalForm
        save={() => {
          items.post({ label: newItem.label, category: newItem.category ? parseInt(newItem.category) : null });
        }} button={handleClickOpen => (
          <Button className={classes.item + ' ' + classes.newItemButton} variant="outlined" color="primary" onClick={handleClickOpen}>
            New item
           </Button>
        )} title="Create a new item" description="You can add items to categories.">
        <ItemForm newItemState={newItemState} cats={cats} />
      </ModalForm>
      <Typography variant="h3" gutterBottom>
        {appState.selectedCategory.label}
      </Typography>
      {appState.itemsInSelectedCategory.length} item{appState.itemsInSelectedCategory.length === 1 ? '' : 's'}
      {
        children
      }
      <div className={classes.buttonPanel}>
        <ModalForm
          save={() => {
            cats.patch(editCat)
          }}
          button={handleClickOpen => (
            <IconButton
              onClick={() => {
                setEditCat({ ...appState.selectedCategory });
                handleClickOpen();
              }}
              aria-label="edit"
              color="primary">
              <EditIcon />
            </IconButton>
          )} title="Edit item" description="">
          <CategoryForm newCategoryState={editCatState} cats={appState.allowedParentsForSelectedCategory} />
        </ModalForm>
        <ModalForm
          save={() => {
            cats.delete(appState.selectedCategory);
            appState.selectedCategory = null
          }}
          button={handleClickOpen => (
            <IconButton onClick={handleClickOpen} aria-label="delete" color="primary">
              <DeleteIcon />
            </IconButton>
          )} title="Delete category" description="Are you sure?">
        </ModalForm>
      </div>
    </Paper>)
})
