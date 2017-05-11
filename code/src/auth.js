const MacaroonsBuilder = require('macaroons.js').MacaroonsBuilder;

const location = 'auth.com'
const caveat_key = '4; guaranteed random by a fair toss of the dice';
const identifier = 'this was how we remind auth of key/pred'

const c = 'time < 2017-05-18T14:45+02:00';

function getIdentifierFor(key, predicate){
    if(key === caveat_key){
        return identifier;
    } else {
        return '';
    }
}

function getDischargeMacaroonFor(user){
    if(user === "Alice") {
        return new MacaroonsBuilder(location, caveat_key, identifier)
            .add_first_party_caveat(c)
            .getMacaroon()
    } else {
        return null;
    }
}

module.exports = { location, getIdentifierFor, getDischargeMacaroonFor };
