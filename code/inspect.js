const MacaroonsBuilder = require('macaroons.js').MacaroonsBuilder;

const location = "http://www.example.org";
const secretKey = "this is our super secret key; only we should know it";
const identifier = "we used our secret key";
const macaroon = MacaroonsBuilder.create(location, secretKey, identifier);
console.log(macaroon.inspect());
