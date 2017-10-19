/**
 * verify.js: Verification of macaroons and first party caveats
 */
const { m, m2, m3, c, c2 } = require('./simple.js');
const MacaroonsBuilder = require('macaroons.js').MacaroonsBuilder;
const MacaroonsVerifier = require('macaroons.js').MacaroonsVerifier;
const TimestampCaveatVerifier = require('macaroons.js').verifier.TimestampCaveatVerifier;
const auth = require('./auth');

const v = new MacaroonsVerifier(m)

const v2 = new MacaroonsVerifier(m2)
    .satisfyExact(c)
    .satisfyGeneral(TimestampCaveatVerifier)


const d = auth.getDischargeMacaroonFor('Alice');

const dp = MacaroonsBuilder.modify(m3)
    .prepare_for_request(d)
    .getMacaroon()

const v3 = new MacaroonsVerifier(m3)
    .satisfyExact(c)

const v4 = new MacaroonsVerifier(m3)
    .satisfyExact(c)
    .satisfyGeneral(TimestampCaveatVerifier)
    .satisfy3rdParty(dp)

module.exports = { v, v2, v3, v4 };
