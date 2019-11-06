# Dot Five Dev Test

This project is in two parts:

1. `front-end` - React/MobX front-end
2. `test-project` -  Node/Sails.js back-end (Blueprint API)

To run the project, first build the front-end:

### `cd front-end`
### `npm i`
### `npm run build`

Now to run the back-end:

### `cd ../test-project`
### `npm i sails -g`
### `npm i`
### `sails lift`

Web app will be available on `http://localhost:1337`

### Trouble shooting

For some permissions reason, I had to run this command before I could install sails globally.

`sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`
