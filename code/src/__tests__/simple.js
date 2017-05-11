const simple = require('../simple');
const verifiers = require('../verify');
const TimestampCaveatVerifier = require('macaroons.js').verifier.TimestampCaveatVerifier;

describe('Verifying macaroons', () => {

  test('m is valid with the correct secret', () => {
    expect(verifiers.v.assertIsValid('changemeInProductionOrYouWillBeFired')).toBeUndefined();
  });

  test('m is not valid with the wrong secret', () => {
    expect(() => verifiers.v.assertIsValid('IChangedTheSecret')).toThrowErrorMatchingSnapshot();
  });

  test('m2 is valid', () => {
    expect(verifiers.v2.assertIsValid(simple.secret)).toBeUndefined();
  });

  test('m3 is not valid without its discharge macaroon', () => {
    expect(() => verifiers.v3.assertIsValid(simple.secret)).toThrowErrorMatchingSnapshot();
  });

  test('m3 is valid with its discharge macaroon', () => {
    expect(verifiers.v4.assertIsValid(simple.secret)).toBeUndefined();
  });
});
