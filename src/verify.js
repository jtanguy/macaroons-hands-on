/**
 * verify.js: Verification of macaroons and first party caveats
 */
const { secret, m, m2, m3, c, c2 } = require('./simple.js');
const MacaroonsVerifier = require('macaroons.js').MacaroonsVerifier;
const TimestampCaveatVerifier = require('macaroons.js').verifier.TimestampCaveatVerifier;


// tag::verify[]
console.log('Verifying m');
let verifier = new MacaroonsVerifier(m);
console.log(verifier.isValid(secret));

console.log('Verifying m2');
let verifier2 = new MacaroonsVerifier(m2);
console.log(verifier2.isValid(secret));

console.log('Verifying m3');
let verifier3 = new MacaroonsVerifier(m);
console.log(verifier.isValid(secret));
// end::verify[]

