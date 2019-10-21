import { Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { observer } from "mobx-react";
import { useSnackbar } from 'notistack';
import React from 'react';
import './App.css';
import AppState from './AppState';
import CategoryForm from './components/CategoryForm';
import CategoryTree from './components/CategoryTree';
import EditDeletePanel from './components/EditDeletePanel';
import Item from './components/Item';
import ItemForm from './components/ItemForm';
import ModalForm from './components/ModalForm';
import { useStyles } from './styles';
const appState = new AppState()

const App = observer(
  () => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const newItemState = React.useState({ label: 'My new item', category: null });
    const newCategoryState = React.useState({ label: 'My new category', parent: null });
    const editItemState = React.useState(null);
    const editCatState = React.useState(null);
    const [newItem, setNewItem] = newItemState;
    const [newCat, setNewCat] = newCategoryState;
    const [editItem, setEditItem] = editItemState;
    const [editCat, setEditCat] = editCatState;
    const { items, cats } = appState;

    items.onMessage = (message) => enqueueSnackbar(`Item ${message}`)
    cats.onMessage = (message) => enqueueSnackbar(`Category ${message}`)

    return (
      <React.Fragment>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <CategoryTree
                  newCat={newCat}
                  appState={appState}
                  newCategoryState={newCategoryState}
                  setNewItem={setNewItem}
                  newItem={newItem}
                  setNewCat={setNewCat}>
                </CategoryTree>
              </Grid>
              {
                appState.selectedCategory &&
                <Grid item>
                  <Paper className={classes.paper + ' ' + classes.category}>
                    
                    <ModalForm
                      save={() => {
                        items.post({ label: newItem.label, category: newItem.category ? parseInt(newItem.category) : null });
                        setNewItem({ ...newItem, label: '' })

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
                      appState.itemsInSelectedCategory.map(item => (
                        <Item
                          remove={() => {
                            items.delete(item);
                          }}
                          handleClick={(handleClickOpen) => {
                            setEditItem({ ...item });
                            handleClickOpen();
                          }}
                          item={item}
                          cats={cats}
                          key={`item${item.id}`}
                          editItemState={editItemState}
                          save={() => {
                            items.patch(editItem)
                          }}>
                        </Item>
                      ))
                    }

                    {appState.selectedCategory && appState.selectedCategory.id ?

                      <EditDeletePanel
                        title="Delete category"
                        handleClick={(handleClickOpen) => {
                          setEditCat({ ...appState.selectedCategory });
                          handleClickOpen();
                        }}
                        onEdit={() => {
                          cats.patch(editCat)
                        }}
                        onDelete={() => {
                          cats.delete(appState.selectedCategory);
                          appState.selectedCategory = null
                        }}>
                        <CategoryForm newCategoryState={editCatState} cats={appState.allowedParentsForSelectedCategory} />
                      </EditDeletePanel> : null
                    }

                  </Paper>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
);
export default App;