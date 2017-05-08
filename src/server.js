'use strict';
const MacaroonsBuilder = require('macaroons.js').MacaroonsBuilder;
const loki = require('lokijs');
const crypto = require('crypto');
const Hapi = require('hapi');
const uuid = require('uuid/v4');

let secrets;
let db = new loki('loki.json', {
  autosave: true,
  autoload: true,
  autoloadCallback: () => { // Hydrate the secrets collection, and create if necessary
    secrets = db.getCollection('secrets');
    if (secrets === null){
      secrets = db.addCollection('secrets', {unique: ['id']});
    }
  }
});



const server = new Hapi.Server();

server.connection({ port: 3000, host: 'localhost' });

server.route({
  method: 'DELETE',
  path: '/db',
  handler: function (request, reply){
    db.removeCollection('secrets');
    secrets = db.addCollection('secrets', {unique: ['id']});
    reply(secrets.data)
  }
});

server.route({
  method: 'GET',
  path: '/db',
  handler: function (request, reply) {
    reply(secrets.data);
  }
});

server.route({
  method: 'POST',
  path: '/macaroons',
  handler: function (request, reply) {
    const secret = crypto.randomBytes(20).toString('hex');
    const id = uuid();
    secrets.insert({secret: secret, id: id});
    const m = MacaroonsBuilder.create(server.info.uri, secret, id)
    server.log(['macaroons', 'inspect'], m);
    reply(m.serialize());
  }
});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
