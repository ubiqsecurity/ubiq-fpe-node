**The Ubiq Structured (Format Preserving Encryption) Library has been merged into the core [ubiq-node](https://github.com/ubiqsecurity/ubiq-node) to improve supportability and maintainability. This package has been deprecated and is no longer supported.**

# Format Preserving Encryption in Node

An implementation of the NIST-approved FF1 and FF3-1 algorithms in Node.

This implementation conforms (as best as possible) to
[Draft SP 800-38G Rev. 1][800-38g1]. The implementation passes all tests
specified by NIST in their Cryptographic Standards and Guidelines
[examples for FF1][ff1-examples]; however, no official examples/samples exist
(or are known) for FF3-1. FF3 is not implemented as NIST has officially
deprecated its use in light of recent [cryptanalysis][ff3-cryptanalysis]
performed on it.


## Installation

#### Using the npm or yarn package managers:
You may want to make sure you are running the latest version of npm or yarn by first executing
```sh
$ npm install -g npm
# or
$ npm install -g yarn
```

Install the ubiq-security-fpe package with:

```sh
$ npm install ubiq-security-fpe
# or
$ yarn add ubiq-security-fpe
```

To build and install directly from a clone of the gitlab repository source:

```sh
$ git clone git@gitlab.com:ubiqsecurity/ubiq-fpe-node.git
$ cd ubiq-node-fpe
$ npm install
```

### Requirements

Node.js version 12 or later
npm version 6 or later

All dependencies are pre-required in the module itself.




# Testing

To run the tests:
```sh
$ npm run test
```

As described above, the unit tests for FF1 come from the NIST guidelines. As
no such guidelines are available for FF3-1, the unit tests verify only that
the encryption and decryption implementations are compatible with each other.

# Documentation

See the [Node API docs][apidocs].




### About alphabets and the radix parameter

The interfaces operate on strings, and the radix parameter determines which
characters are valid within those strings, i.e. the alphabet. For example, if
your radix is 10, then the alphabet for your plain text consists of the
characters in the string "0123456789". If your radix is 16, then the
alphabet is the characters in the string "0123456789abcdef".

A radix of up to 255 is supported, and the alphabet for a radix of 36 is
"0123456789abcdefghijklmnopqrstuvwxyz".

### Tweaks

Tweaks are very much like Initialization Vectors (IVs) in "traditional"
encryption algorithms. For FF1, the minimun and maximum allowed lengths of
the tweak may be specified by the user, and any tweak length between those
values may be used. For FF3-1, the size of the tweak is fixed at 7 bytes.

### Plain/ciphertext input lengths

For both FF1 and FF3-1, the minimum length is determined by the inequality:
- radix<sup>minlen</sup> >= 1000000

or:
- minlen >= 6 / log<sub>10</sub> radix

Thus, the minimum length is determined by the radix and is automatically
calculated from it.

For FF1, the maximum input length is
- 2<sup>32</sup>

For FF3-1, the maximum input length is
- 2 * log<sub>radix</sub> 2<sup>96</sup>

or:
- 192 / log<sub>2</sub> radix

## Examples

The [unit test code](test) provides the best and simplest example of how to use the
interfaces.


### FF1
```javascript
   /*
     * @key is an array of bytes which must be 16, 24, or 32 long
     * @twk is an array of bytes of which must be between @twkmin
     *     and @twkmax lengths passed in. 
     * @custom_radix_str is the custom radix string indicating valid
     *     characters allowed by @PT and @encrypted_text.  In this
     *     case, Radix 10 (numeric) is being used.
     * 
     * @PT is "user input" for the data being encrypted
     */

    const custom_radix_str = "0123456789"

    const ctx = new FF1(key, twk, twkmin, twkmax, custom_radix_str.length, custom_radix_str);
    const cipher_text = ctx.encrypt(PT);
    const decrypted_text = ctx.decrypt(cipher_text);
```

[800-38g1]:https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-38Gr1-draft.pdf
[ff1-examples]:https://csrc.nist.gov/CSRC/media/Projects/Cryptographic-Standards-and-Guidelines/documents/examples/FF1samples.pdf
[ff3-cryptanalysis]:https://csrc.nist.gov/News/2017/Recent-Cryptanalysis-of-FF3
[dashboard]:https://dashboard.ubiqsecurity.com
[credentials]:https://dev.ubiqsecurity.com/docs/how-to-create-api-keys
[apidocs]:https://dev.ubiqsecurity.com/docs/api

