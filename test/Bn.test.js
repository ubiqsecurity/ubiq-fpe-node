const bn = require('../Bn')



/*
12/20/21
Check in initial set of unit tests.

How to execute:
 
$ npm run test

> ubiq-fpe-node@1.0.0 test /Users/anthonyiasi/ubiq-fpe-node
> jest

 PASS  test/Bn.test.js
  ✓ radix_exceptions (10 ms)
  ✓ radix_edgecase (1 ms)
  ✓ radix_dec2hex (1 ms)
  ✓ radix_oct2hex
  ✓ radix_dec2dec (1 ms)
  ✓ radix_oct2dec

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        0.258 s, estimated 1 s
Ran all test suites.
*/






test('radix_exceptions', () => {
    expect(() => bn.__bigint_set_str("109", "012345678")).toThrow();
    expect(() => bn.__bigint_set_str("109", "")).toThrow();
    expect(() => bn.__bigint_get_str("", 0)).toThrow();
});


test('radix_edgecase', () => {
    r1 = bn.__bigint_set_str("0", "0123456789");
    expect(r1).toBe(0);
    expect(bn.__bigint_get_str("0123456789ABCDEF", r1)).toBe("0");
    expect(bn.__bigint_get_str("0123456789ABCDEF", 0)).toBe("0");
});

 
test('radix_dec2hex', () => {
    r1 = bn.__bigint_set_str("100", "0123456789");
    expect(r1).toBe(100);
    expect(bn.__bigint_get_str("0123456789ABCDEF", r1)).toBe("64");
   });


test('radix_oct2hex', () => {
    r1 = bn.__bigint_set_str("100", "01234567");
    expect(r1).toBe(64);
    expect(bn.__bigint_get_str("0123456789ABCDEF", r1)).toBe("40");
});


test('radix_dec2dec', () => {
    r1 = bn.__bigint_set_str("@$#", "!@#$%^&*()");
    expect(r1).toBe(132);
    expect(bn.__bigint_get_str("0123456789", r1)).toBe("132");
});


test('radix_oct2dec', () => {
    r1 = bn.__bigint_set_str("@$#", "!@#$%^&*");
    expect(r1).toBe(90);
    expect(bn.__bigint_get_str("0123456789", r1)).toBe("90");
});
