﻿const FF1 = require('../lib/FF1');

function getRadixStr(radix) {
    if (radix === 2) {
        return '01';
    }
    if (radix === 10) {
        return '0123456789';
    }
    if (radix === 36) {
        return '0123456789abcdefghijklmnopqrstuvwxyz';
    }
    if (radix === 62) {
        return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    }
}
function ff1_test(key, twk, PT, CT, radix, custom_radix_str) {
    // const testKey = [...key];
    // let result;
    if (!custom_radix_str) {
        custom_radix_str = getRadixStr(radix);
    }

    // expect(PT.length).toBe(CT.length);
    const ctx = new FF1(key, twk, 0, 0, radix, custom_radix_str);
    // const ctx = new FF1(K, T, 0, 0, 10);
    const encrypted = ctx.encrypt(PT);
    expect(CT).toBe(encrypted);
    const decrypted = ctx.decrypt(CT);
    expect(PT).toBe(decrypted);
}

// test('test ff1-nist1', () => {
//    Test(_key, _twk1, _pt[0], '2433477484', 10);
// });

test('test ff1 - nist1', () => {
    const K = new Uint8Array([
        0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
        0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c,
    ]);

    const T = new Uint8Array(0);

    const PT = '0123456789';
    const CT = '2433477484';

    ff1_test(K, T, PT, CT, 10, '0123456789');
});

test('test ff1 - nist2', () => {
    const K = new Uint8Array([
        0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
        0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c,
    ]);

    const T = new Uint8Array([
        0x39, 0x38, 0x37, 0x36, 0x35, 0x34, 0x33, 0x32, 0x31, 0x30,
    ]);

    const PT = '0123456789';
    const CT = '6124200773';

    ff1_test(K, T, PT, CT, 10);
});

test('test ff1 - nist3', () => {
    const K = new Uint8Array([
        0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
        0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c]);

    const T = new Uint8Array([
        0x37, 0x37, 0x37, 0x37, 0x70, 0x71, 0x72, 0x73, 0x37, 0x37, 0x37,
    ]);

    const PT = '0123456789abcdefghi';
    const CT = 'a9tv40mll9kdu509eum';

    ff1_test(K, T, PT, CT, 36);
});

test('test ff1 - nist4', () => {
    const K = new Uint8Array([
        0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
        0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c,
        0xef, 0x43, 0x59, 0xd8, 0xd5, 0x80, 0xaa, 0x4f,
    ]);

    const T = new Uint8Array([]);

    const PT = '0123456789';
    const CT = '2830668132';

    ff1_test(K, T, PT, CT, 10);
});

test('test ff1 - nist5', () => {
    const K = new Uint8Array([
        0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
        0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c,
        0xef, 0x43, 0x59, 0xd8, 0xd5, 0x80, 0xaa, 0x4f,
    ]);

    const T = new Uint8Array([
        0x39, 0x38, 0x37, 0x36, 0x35, 0x34, 0x33, 0x32, 0x31, 0x30,
    ]);

    const PT = '0123456789';
    const CT = '2496655549';

    ff1_test(K, T, PT, CT, 10);
});

test('test ff1 - nist6', () => {
    const K = new Uint8Array([
        0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
        0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c,
        0xef, 0x43, 0x59, 0xd8, 0xd5, 0x80, 0xaa, 0x4f,
    ]);

    const T = new Uint8Array([
        0x37, 0x37, 0x37, 0x37, 0x70, 0x71, 0x72, 0x73, 0x37, 0x37, 0x37,
    ]);

    const PT = '0123456789abcdefghi';
    const CT = 'xbj3kv35jrawxv32ysr';

    ff1_test(K, T, PT, CT, 36);
});

test('test ff1 - nist5', () => {
    const K = new Uint8Array([
        0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
        0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c,
        0xef, 0x43, 0x59, 0xd8, 0xd5, 0x80, 0xaa, 0x4f,
        0x7f, 0x03, 0x6d, 0x6f, 0x04, 0xfc, 0x6a, 0x94,
    ]);

    const T = new Uint8Array([]);

    const PT = '0123456789';
    const CT = '6657667009';

    ff1_test(K, T, PT, CT, 10);
});

test('test ff1 - nist5', () => {
    const K = new Uint8Array([
        0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
        0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c,
        0xef, 0x43, 0x59, 0xd8, 0xd5, 0x80, 0xaa, 0x4f,
        0x7f, 0x03, 0x6d, 0x6f, 0x04, 0xfc, 0x6a, 0x94,
    ]);

    const T = new Uint8Array([
        0x39, 0x38, 0x37, 0x36, 0x35, 0x34, 0x33, 0x32, 0x31, 0x30,
    ]);

    const PT = '0123456789';
    const CT = '1001623463';

    ff1_test(K, T, PT, CT, 10);
});

test('test ff1 - nist9', () => {
    const K = new Uint8Array([
        0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
        0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c,
        0xef, 0x43, 0x59, 0xd8, 0xd5, 0x80, 0xaa, 0x4f,
        0x7f, 0x03, 0x6d, 0x6f, 0x04, 0xfc, 0x6a, 0x94,
    ]);

    const T = new Uint8Array([
        0x37, 0x37, 0x37, 0x37, 0x70, 0x71, 0x72, 0x73, 0x37, 0x37, 0x37,
    ]);

    const PT = '0123456789abcdefghi';
    const CT = 'xs8a0azh2avyalyzuwd';

    ff1_test(K, T, PT, CT, 36);
});

test('test ff1 - base2', () => {
    const K = new Uint8Array([
        0xf4, 0xa1, 0x16, 0xd6, 0xee, 0x40, 0x6a, 0x53,
        0xa5, 0x6c, 0xbe, 0x0f, 0x4a, 0xa7, 0xb1, 0x00,
        0x1c, 0xdc, 0x0a, 0x55, 0xca, 0xc9, 0x63, 0xcf,
        0x5a, 0xce, 0x39, 0x04, 0x88, 0xb3, 0x47, 0x7a,
    ]);
    const T = new Uint8Array([
        0xfd, 0x7f, 0x4b, 0x99, 0x45, 0xa3, 0xc5, 0x35,
        0xad, 0xb4, 0x72, 0x00, 0x27, 0x11, 0x6c, 0xa0,
        0xf4, 0x98, 0x7d, 0x7f, 0x3f, 0xdb, 0xa9, 0xbb,
        0xc4, 0x0e, 0x75, 0x37, 0x5f, 0xea, 0xa6, 0x3c,
    ]);

    const PT = '00000101011011011101001001010011100111100011001';
    const CT = '10110101001110101101110000011000000011111100111';

    ff1_test(K, T, PT, CT, 2);
});

test('test ff1 - base2_A', () => {
    const K = new Uint8Array([
        0xf4, 0xa1, 0x16, 0xd6, 0xee, 0x40, 0x6a, 0x53,
        0xa5, 0x6c, 0xbe, 0x0f, 0x4a, 0xa7, 0xb1, 0x00,
        0x1c, 0xdc, 0x0a, 0x55, 0xca, 0xc9, 0x63, 0xcf,
        0x5a, 0xce, 0x39, 0x04, 0x88, 0xb3, 0x47, 0x7a,
    ]);
    const T = new Uint8Array([
        0xfd, 0x7f, 0x4b, 0x99, 0x45, 0xa3, 0xc5, 0x35,
        0xad, 0xb4, 0x72, 0x00, 0x27, 0x11, 0x6c, 0xa0,
        0xf4, 0x98, 0x7d, 0x7f, 0x3f, 0xdb, 0xa9, 0xbb,
        0xc4, 0x0e, 0x75, 0x37, 0x5f, 0xea, 0xa6, 0x3c,
    ]);

    const PT = '000010101100011111010000111001100001011010011110100100110010010000000101000011000000001111110101111100111001001001100100100110101111110000011101010111001111010000010010111110101100001001100011';
    const CT = '111110001101110010010110001010100001101011001010011010111001001101101000011110000110110000001101011110101100001101000011101110110101001111100001011010010000010111001110010011001100001111100101';

    ff1_test(K, T, PT, CT, 2);
});

test('test ff1 - base2_b', () => {
    const K = new Uint8Array([
        0xf4, 0xa1, 0x16, 0xd6, 0xee, 0x40, 0x6a, 0x53,
        0xa5, 0x6c, 0xbe, 0x0f, 0x4a, 0xa7, 0xb1, 0x00,
        0x1c, 0xdc, 0x0a, 0x55, 0xca, 0xc9, 0x63, 0xcf,
        0x5a, 0xce, 0x39, 0x04, 0x88, 0xb3, 0x47, 0x7a,
    ]);
    const T = new Uint8Array([
        0xfd, 0x7f, 0x4b, 0x99, 0x45, 0xa3, 0xc5, 0x35,
        0xad, 0xb4, 0x72, 0x00, 0x27, 0x11, 0x6c, 0xa0,
        0xf4, 0x98, 0x7d, 0x7f, 0x3f, 0xdb, 0xa9, 0xbb,
        0xc4, 0x0e, 0x75, 0x37, 0x5f, 0xea, 0xa6, 0x3c,
    ]);

    const PT = '00000111011010010101111110011110001011111000110100000101001010001100001101111000010000101011100100010111011101001010010100101010100011010101010000101111111001111100110100001100011001011010010000110';
    const CT = '00110011001000111100010111110001000110110110010010101101001011101001101010010001111001010100100001110101010101101110110010100110101110111011111010110010101110000001101000101010100011010100111011000';

    ff1_test(K, T, PT, CT, 2);
});

test('test ff1 - base2_c', () => {
    const K = new Uint8Array([
        0xf4, 0xa1, 0x16, 0xd6, 0xee, 0x40, 0x6a, 0x53,
        0xa5, 0x6c, 0xbe, 0x0f, 0x4a, 0xa7, 0xb1, 0x00,
        0x1c, 0xdc, 0x0a, 0x55, 0xca, 0xc9, 0x63, 0xcf,
        0x5a, 0xce, 0x39, 0x04, 0x88, 0xb3, 0x47, 0x7a,
    ]);
    const T = new Uint8Array([
        0xfd, 0x7f, 0x4b, 0x99, 0x45, 0xa3, 0xc5, 0x35,
        0xad, 0xb4, 0x72, 0x00, 0x27, 0x11, 0x6c, 0xa0,
        0xf4, 0x98, 0x7d, 0x7f, 0x3f, 0xdb, 0xa9, 0xbb,
        0xc4, 0x0e, 0x75, 0x37, 0x5f, 0xea, 0xa6, 0x3c,
    ]);

    const PT = '00001100010001110001000111100100001111110110000000001010000001111100000111100101110111101100101011001010010010001011100000100100011100010111111000111101010111010110011001000010000101000100000111011001000010000111001010100101111011111100111111101010001111101111101000101111101100101001000010110101011100011011001110101101001100100101101000000111100100110000001111011000110011110000011011101111001110101101111001001111010101011001100011001111001110';
    const CT = '10101101001111110110110001010101110111011010101001110011111101101101000001110010100110110011011101000101010001111101100000110000101110000000110001011000100000111001111011101011100011100010100001010011110100010001001000001101110010110111100010101001000100100000010111100000101000010100011001100011111110011100111110011100111111011001101011100010100110001100111000100000101011111110100011110011101001010110001000011010011011101001101000001100110100';

    ff1_test(K, T, PT, CT, 2);
});

test('test ff1 - base2_d', () => {
    const K = new Uint8Array([
        0xf4, 0xa1, 0x16, 0xd6, 0xee, 0x40, 0x6a, 0x53,
        0xa5, 0x6c, 0xbe, 0x0f, 0x4a, 0xa7, 0xb1, 0x00,
        0x1c, 0xdc, 0x0a, 0x55, 0xca, 0xc9, 0x63, 0xcf,
        0x5a, 0xce, 0x39, 0x04, 0x88, 0xb3, 0x47, 0x7a,
    ]);
    const T = new Uint8Array([
        0xfd, 0x7f, 0x4b, 0x99, 0x45, 0xa3, 0xc5, 0x35,
        0xad, 0xb4, 0x72, 0x00, 0x27, 0x11, 0x6c, 0xa0,
        0xf4, 0x98, 0x7d, 0x7f, 0x3f, 0xdb, 0xa9, 0xbb,
        0xc4, 0x0e, 0x75, 0x37, 0x5f, 0xea, 0xa6, 0x3c,
    ]);

    const PT = '0000100001110000110111000100110011101011100100100000011011100101010101010100111000001001001010110110101100010001111111101001100100001110000001101100101000110000001101100100110101101101111011010100010100110101110011101101001000010100110111101111000100001011010011000000000011001010110000110111110010111110001010111000011100010010100111011110010100110101000100101010010100001110010101001100010001111000011110001101011010001010110110010000111001110110101';
    const CT = '0101111000110110000111000111011100110111101000100000100010100110100010001101000101111000100000111000000011110111001001101010100001111100100101100100000000000011100011110010100010000010001001101100011100111110101110000101111010100111100000111000000111011011010101111100110101000110001110110001110011111000111110010000100010000101010110000010010100001111011010110111011111101000100000010111101010000011011110001000000011111010110010100101001000111101110';

    ff1_test(K, T, PT, CT, 2);
});

test('test ff1 - base2_e', () => {
    const K = new Uint8Array([
        0xf4, 0xa1, 0x16, 0xd6, 0xee, 0x40, 0x6a, 0x53,
        0xa5, 0x6c, 0xbe, 0x0f, 0x4a, 0xa7, 0xb1, 0x00,
        0x1c, 0xdc, 0x0a, 0x55, 0xca, 0xc9, 0x63, 0xcf,
        0x5a, 0xce, 0x39, 0x04, 0x88, 0xb3, 0x47, 0x7a,
    ]);
    const T = new Uint8Array([
        0xfd, 0x7f, 0x4b, 0x99, 0x45, 0xa3, 0xc5, 0x35,
        0xad, 0xb4, 0x72, 0x00, 0x27, 0x11, 0x6c, 0xa0,
        0xf4, 0x98, 0x7d, 0x7f, 0x3f, 0xdb, 0xa9, 0xbb,
        0xc4, 0x0e, 0x75, 0x37, 0x5f, 0xea, 0xa6, 0x3c,
    ]);

    const PT = '0000100001110000110111000100110011101011100100100000011011100101010101010100111000001001001010110110101100010001111111101001100100001110000001101100101000110000001101100100110101101101111011010100010100110101110011101101001000010100110111101111000100001011010011000000000011001010110000110111110010111110001010111000011100010010100111011110010100110101000100101010010100001110010101001100010001111000011110001101011010001010110110010000111001110110101000010000111000011011100010011001110101110010010000001101110010101010101010011100000100100101011011010110001000111111110100110010000111000000110110010100011000000110110010011010110110111101101010001010011010111001110110100100001010011011110111100010000101101001100000000001100101011000011011111001011111000101011100001110001001010011101111001010011010100010010101001010000111001010100110001000111100001111000110101101000101011011001000011100111011010100001000011100001101110001001100111010111001001000000110111001010101010101001110000010010010101101101011000100011111111010011001000011100000011011001010001100000011011001001101011011011110110101000101001101011100111011010010000101001101111011110001000010110100110000000000110010101100001101111100101111100010101110000111000100101001110111100101001101010001001010100101000011100101010011000100011110000111100011010110100010101101100100001110011101101010000100001110000110111000100110011101011100100100000011011100101010101010100111000001001001010110110101100010001111111101001100100001110000001101100101000110000001101100100110101101101111011010100010100110101110011101101001000010100110111101111000100001011010011000000000011001010110000110111110010111110001010111000011100010010100111011110010100110101000100101010010100001110010101001100010001111000011110001101011010001010110110010000111001110110101';
    const CT = '0000010100010011101101101111101011010101110011111000100110100110001101001001111110001100001010111011001001101100011110010111111111100011111111111011100000101000000101101100011001110110011011110111011101101111110110000101000011111101100100100101010110111010101111001011000001100000100000110110110111001101010101001111101111010111010111001101101000000101100001000100100001111001001001001000001010010000101000110111010010000010010101000000111111101001011101111111000100101001100110001111001101110001010110011000000000101011001010110110011101100111001110010111011010101110100100111010111000010011010000001001001111110110001110010110111101101000001100101101100010101101010110010001001110010001100110101100011001010010011001100101010001111010100000101010011111010001110110000111101010111111101101001001110001110110111111100101001010110010011000011111110111110000010010110110111100110101000111000011010100100001101001010001110000011110001110101001010110011111100010001011001110110100000001010001010101001000011000001010010001110110001011000010010011111011101001110010100101001000011111100011111111110000110111001101101001111111010011011110101101011111010010101000100011010011111010100101011001100110110101011110110000010110111101001100000001011000010000110111100111110001101011011000010010011111101010001100010010001100111111110011101000111110101001100011010100100110110111010010010001100001101000111000000010000111101010001011111100011111001111000111001110100110010110000101000100001000001100100000100101011001000001011010000000000011100110001001011111001011101010100001101101000111101010111000101001000001100011110000101111100110110100001111001110011111111000100011000010000000110110101011101001010000001011010010101111101100100011110101110101110101010110001110100000000010100011000111011011110100111111111100';

    ff1_test(K, T, PT, CT, 2);
});

test('test ff1 - base10_a', () => {
    const K = new Uint8Array([
        0xf4, 0xa1, 0x16, 0xd6, 0xee, 0x40, 0x6a, 0x53,
        0xa5, 0x6c, 0xbe, 0x0f, 0x4a, 0xa7, 0xb1, 0x00,
        0x1c, 0xdc, 0x0a, 0x55, 0xca, 0xc9, 0x63, 0xcf,
        0x5a, 0xce, 0x39, 0x04, 0x88, 0xb3, 0x47, 0x7a,
    ]);
    const T = new Uint8Array([
        0xfd, 0x7f, 0x4b, 0x99, 0x45, 0xa3, 0xc5, 0x35,
        0xad, 0xb4, 0x72, 0x00, 0x27, 0x11, 0x6c, 0xa0,
        0xf4, 0x98, 0x7d, 0x7f, 0x3f, 0xdb, 0xa9, 0xbb,
        0xc4, 0x0e, 0x75, 0x37, 0x5f, 0xea, 0xa6, 0x3c,
    ]);

    const PT = '0000100001110000110111000100110011101011100100100000011011100101010101010100111000001001001010110110101100010001111111101001100100001110000001101100101000110000001101100100110101101101111011010100010100110101110011101101001000010100110111101111000100001011010011000000000011001010110000110111110010111110001010111000011100010010100111011110010100110101000100101010010100001110010101001100010001111000011110001101011010001010110110010000111001110110101000010000111000011011100010011001110101110010010000001101110010101010101010011100000100100101011011010110001000111111110100110010000111000000110110010100011000000110110010011010110110111101101010001010011010111001110110100100001010011011110111100010000101101001100000000001100101011000011011111001011111000101011100001110001001010011101111001010011010100010010101001010000111001010100110001000111100001111000110101101000101011011001000011100111011010100001000011100001101110001001100111010111001001000000110111001010101010101001110000010010010101101101011000100011111111010011001000011100000011011001010001100000011011001001101011011011110110101000101001101011100111011010010000101001101111011110001000010110100110000000000110010101100001101111100101111100010101110000111000100101001110111100101001101010001001010100101000011100101010011000100011110000111100011010110100010101101100100001110011101101010000100001110000110111000100110011101011100100100000011011100101010101010100111000001001001010110110101100010001111111101001100100001110000001101100101000110000001101100100110101101101111011010100010100110101110011101101001000010100110111101111000100001011010011000000000011001010110000110111110010111110001010111000011100010010100111011110010100110101000100101010010100001110010101001100010001111000011110001101011010001010110110010000111001110110101';
    const CT = '3553494089916656541184478908087049735544912674297349664796606620188730753059002844128234255625871546044854395209962926784724128560713512248808687211149744598195412712940468163774096628350620951413711803950518594617373351544393856373450320087523262022383945648127372062478231148038471844014871132794421592688429360388632538622007325709023114489620502858661369331722385345630805557726657301103731476891939356540625190861223831202018869059523597995303290074121079428721457071756416572728029177746810900307020259537765410201929963086982307837186509364236956511999350147323721010332857847774386067644233703989840323109138134072973241903156111826976160812600185129257000146824574348291127595725594892501619634508128488731892352987207154538043275865206720407431701986579498575764625682405793438116486315329904924734993624192175538907728005546006779836347751281158514862256352526481718064122564580367217956237464358103196538875291283690155429858297253893898279060676625001618108275714219171491371113956773762844941034947472026591341252339034136627998253233817606250024841230463067533567089935603756301565820369079927700758805948772321763265628871349903204249162513281402250087834393259987925784678440411900598614732588243252529912937631866659880744158524571625718103685314053287308120410823249151599910726383359255592539946379861183034458490744302067049236667020141763610651851768955009732517336400650838408764716423829225801720580144333813816604222676507183341558005308742505170406478517237115923457992442034329915124651627732600793249273733794088807416454414747271994796609670521986503851051553369292884493564374526214897996510458573439669519885826154261070811550077849422033063494354368756584234578197857360235955389059655914778268996127569020343877063422715737926819877510937231474460324658469989214234346399';

    ff1_test(K, T, PT, CT, 10);
});
test('ff1, so_alphanum_po', () => {
    const K = [
        0xeb, 0x7a, 0xd8, 0x17, 0x56, 0xd8, 0x4c, 0x67,
        0x01, 0xb1, 0x5f, 0x5b, 0x68, 0x00, 0x3c, 0xbd,
        0x9d, 0x17, 0xf7, 0xf8, 0x03, 0x2a, 0x1a, 0x62,
        0x4a, 0x30, 0x33, 0x87, 0xcc, 0x12, 0x36, 0x8e,
    ];
    const T = [
        0xdc, 0x4d, 0x52, 0xaa, 0x15, 0xd8, 0x7e, 0x71,
        0x0d, 0xde, 0xa1, 0x76, 0x5e, 0x6a, 0x59, 0x48,
        0x8f, 0x9d, 0xfe, 0x8d, 0x60, 0x36, 0x33, 0xff,
        0xc0, 0xb5, 0x95, 0xee, 0xfc, 0x23, 0x38, 0x80,
    ];

    const PT = '1234';
    const CT = 'ZO7G';
    const radix = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    ff1_test(K, T, PT, CT, radix.length, radix);
});