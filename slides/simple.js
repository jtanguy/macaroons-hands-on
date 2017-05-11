/**
 * simple.js: Simple creation of macaroons and first party caveats
 *
 * The tag:: stuff are markers for the asciidoc presentation
 */
// tag::frontmatter[]
const MacaroonsBuilder = require('macaroons.js').MacaroonsBuilder;
const location = require('os').hostname();

const secret = 'changemeInProductionOrYouWillBeFired';
const identifier = `it's a me, Mario`;

// end::frontmatter[]

// tag::simple[]
const m = MacaroonsBuilder.create(location, secret, identifier);
// end::simple[]

// tag::caveats[]
const c = 'talk = macaroons-hands-on';
const m2 = new MacaroonsBuilder(m).add_first_party_caveat(c).getMacaroon();

const c2 = 'time < 2017-05-18T14:45+02:00';
const m3 = new MacaroonsBuilder(m2).add_first_party_caveat(c2).getMacaroon();

const c3 = 'time < 2017-04-18T14:45+02:00';
const m4 = new MacaroonsBuilder(m3).add_first_party_caveat(c3).getMacaroon();
// end::caveats[]

module.exports = { location, secret, identifier, m, m2, m3, m4, c, c2, c3 };
