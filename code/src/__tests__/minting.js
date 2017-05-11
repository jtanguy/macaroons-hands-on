const simple = require('../simple');

describe('Minting Macaroons', () => {

  test('m', () => {
    expect(simple.m.inspect()).toMatchSnapshot();
  });

  test('m2 has two caveats', () => {
    expect(simple.m2.inspect()).toMatchSnapshot();
  });

});

