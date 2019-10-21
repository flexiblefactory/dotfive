import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { observer } from "mobx-react"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        display: 'block'
    },
    textField: {
        margin: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
}));
export default observer(({ cats, newCategoryState: [values, setValues] })=> {
    const classes = useStyles();

    const handleChange = name => event => {
        console.log(name, event.target.value)
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.textField}
                    value={values.label}
                    onChange={handleChange('label')}
                    margin="normal"
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="cat-parent">
                    Parent category
            </InputLabel>
                <Select
                    native
                    value={values.parent || ''}
                    onChange={handleChange('parent')}
                    inputProps={{
                        name: 'parent',
                        id: 'cat-parent',
                    }}>
                    {[{ id: 'null', label: 'None' }, ...cats]
                        .map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </Select>
            </FormControl>
        </React.Fragment>)
})
