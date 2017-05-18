/**
 * simple.js: Simple creation of macaroons and first party caveats
 */
const MacaroonsBuilder = require('macaroons.js').MacaroonsBuilder;
const auth = require('./auth');

const location = 'ncrafts.io';
const secret = 'changemeInProductionOrYouWillBeFired';
const identifier = `it's a me, Julien!`;

/**
 * Simple macaroon
 */
const m = MacaroonsBuilder.create(location, secret, identifier);


/**
 * Macaroon with first party caveats
 */
const c = 'talk = macaroons-hands-on';
const c2 = 'time < 2017-05-18T14:45+02:00';

const m2 = new MacaroonsBuilder(location, secret, identifier)
    .getMacaroon();

/**
 * Macaroon with first party and third party caveats
 */
const caveat_key = '4; guaranteed random by a fair toss of the dice';
const predicate = 'user = Alice';

const authIdentifier = auth.getIdentifierFor(caveat_key, predicate);

const m3 = new MacaroonsBuilder(location, secret, identifier)
    .getMacaroon()

module.exports = { location, secret, identifier, m, m2, m3, c, c2 };
