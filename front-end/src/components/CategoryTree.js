
import { Button, Paper } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeView from '@material-ui/lab/TreeView';
import { observer } from "mobx-react";
import React from 'react';
import { useStyles } from '../styles';
import Category from './Category';
import CategoryForm from './CategoryForm';
import ModalForm from './ModalForm';
export default observer(({ newCat, setNewCat, appState, newItem, setNewItem, newCategoryState }) => {
  const classes = useStyles();
  const { cats } = appState;

  return (
    <Paper className={classes.paper}>
      <ModalForm
        save={() => {
          if (!newCat.label) return;
          cats.post({ label: newCat.label, parent: newCat.parent ? parseInt(newCat.parent) : null });
          setNewCat({ ...newCat, label: '' });
        }}
        button={handleClickOpen => (
          <Button className={classes.newItemButton} variant="outlined" color="secondary" onClick={handleClickOpen}>
            New Category
          </Button>)} title="Create a new category" description="You can add categories to categories to create a hierachy.">
        <CategoryForm newCategoryState={newCategoryState} cats={cats.all} />
      </ModalForm>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />} >
        <Category onSelect={(cat) => {
          appState.selectedCategory = cat;
          setNewItem({ ...newItem, category: cat.id, label: '' })
        }} cats={cats} cat={{ id: null, label: 'Categories' }} />
      </TreeView>
    </Paper>
  )
})

