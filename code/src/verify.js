/**
 * verify.js: Verification of macaroons and first party caveats
 */
const { m, m2, m3, c, c2 } = require('./simple.js');
const MacaroonsBuilder = require('macaroons.js').MacaroonsBuilder;
const MacaroonsVerifier = require('macaroons.js').MacaroonsVerifier;
const TimestampCaveatVerifier = require('macaroons.js').verifier.TimestampCaveatVerifier;
const auth = require('./auth');


/**
 * Simple macaroon
 */
const v = new MacaroonsVerifier(m)


/**
 * Macaroon with first party caveats
 */
const v2 = new MacaroonsVerifier(m2)


/**
 * Macaroon with first party and third party caveats
 */

const dp = MacaroonsBuilder.modify(m3)
    .getMacaroon()

const v3 = new MacaroonsVerifier(m3)

const v4 = new MacaroonsVerifier(m3)

module.exports = { v, v2, v3, v4 };
