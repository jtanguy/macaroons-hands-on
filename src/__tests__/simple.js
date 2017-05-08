const simple = require('../simple.js');
const MacaroonsVerifier = require('macaroons.js').MacaroonsVerifier;
const TimestampCaveatVerifier = require('macaroons.js').verifier.TimestampCaveatVerifier;

describe('macaroon:creation', () => {
  test('m has the correct signature"', () => {
    expect(simple.m.signature).toMatchSnapshot();
  });

  test('m2 has the correct signature"', () => {
    expect(simple.m2.signature).toMatchSnapshot();
  });

  test('m3 has the correct signature"', () => {
    expect(simple.m3.signature).toMatchSnapshot();
  });
});

describe('macaroon:verification', () => {
  test('m is valid with the correct secret', () => {
    let verifier = new MacaroonsVerifier(simple.m);
    expect(verifier.isValid(simple.secret)).toBe(true);
  });
  test('m is not valid with the wrong secret', () => {
    let verifier = new MacaroonsVerifier(simple.m);
    expect(verifier.isValid('something else')).toBe(false);
  });
  test('m2 is not valid without verifying its caveats', () => {
    let verifier = new MacaroonsVerifier(simple.m2);
    expect(verifier.isValid(simple.secret)).toBe(false);
  });
  test('m2 is valid when verifying its caveats', () => {
    let verifier = new MacaroonsVerifier(simple.m2).satisfyExact(simple.c);
    expect(verifier.isValid(simple.secret)).toBe(true);
  });
  test('m2 is still valid when verifying more than its caveats', () => {
    let verifier = new MacaroonsVerifier(simple.m2)
      .satisfyExact(simple.c)
      .satisfyGeneral(TimestampCaveatVerifier);
    expect(verifier.isValid(simple.secret)).toBe(true);
  });
  test('m3 is valid when verifying its caveats', () => {
    let verifier = new MacaroonsVerifier(simple.m3)
      .satisfyExact(simple.c)
      .satisfyGeneral(TimestampCaveatVerifier);
    expect(verifier.isValid(simple.secret)).toBe(true);
  });
  test('m4 is not valid when verifying its caveats', () => {
    let verifier = new MacaroonsVerifier(simple.m4)
      .satisfyExact(simple.c)
      .satisfyGeneral(TimestampCaveatVerifier);
    expect(verifier.isValid(simple.secret)).toBe(false);
  });

});
