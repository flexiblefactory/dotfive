import { decorate, observable, computed, set } from "mobx"
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';

const io = sailsIOClient(socketIOClient);
io.sails.url = 'http://localhost:1337';

const corsFetch = (path, method, config) => {
  return fetch(io.sails.url + '/' + path, {
    method,
    mode: 'cors',
    credentials: 'include',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    ...config
  });
}

export default decorate(class EntitySet {

  constructor(path) {

    this.path = path
    this.items = observable(new Map())
    io.socket.get('/' + path + '?populate=false', (body, JWR) => {

      console.log('Sails responded with: ', body);
      console.log('with headers: ', JWR.headers);
      console.log('and with status code: ', JWR.statusCode);

      this.items.replace(body.map(e => [e.id, e]));

    });

    io.socket.on(path, (msg) => {
      console.log('Item!: ', msg);
      const verbHandler = this[`_${msg.verb}`];
      verbHandler && this.onMessage && this.onMessage(`${msg.verb}: ${verbHandler.call(this, msg)}`, msg);
    });
  }

  _created(msg) {

    Object.keys(msg.data).
      forEach((k) =>
        typeof (msg.data[k]) === 'object' &&
        msg.data[k] &&
        msg.data[k].id &&
        (() => msg.data[k] = msg.data[k].id)())

    this.items.set(msg.id, msg.data)

    return msg.data.label
  }

  _destroyed(msg) {
    this.items.delete(msg.id)
    return msg.previous.label
  }

  _updated(msg) {
    set(this.items.get(msg.id), msg.data)
    return msg.data.label || '';
  }

  get all() {
    return Array.from(this.items.values())
  }

  async post(item) {
    return (await corsFetch(this.path, 'POST', { body: JSON.stringify(item) })).json()
  }

  async patch(item) {
    return (await corsFetch(this.path + '/' + item.id, 'PATCH', { body: JSON.stringify(item) })).json();
  }

  async delete(item) {
    return (await corsFetch(this.path + '/' + item.id, 'DELETE')).json();
  }

  findById(id) {
    return this.items.get(id)
  }

}, {
  all: computed,
})
