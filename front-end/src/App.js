import Grid from '@material-ui/core/Grid';
import { observer } from "mobx-react";
import { useSnackbar } from 'notistack';
import React from 'react';
import './App.css';
import AppState from './AppState';
import CategoryDetail from './components/CategoryDetail';
import CategoryTree from './components/CategoryTree';
import Item from './components/Item';
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
              {appState.selectedCategory &&
                <Grid item>
                  <CategoryDetail
                    appState={appState}
                    newItem={newItem}
                    editCatState={editCatState}
                    newItemState={newItemState}>
                    {appState.itemsInSelectedCategory.map(item => (
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
                    ))}
                  </CategoryDetail>
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
