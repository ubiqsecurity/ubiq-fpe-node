const CryptoJS = require('crypto-js');


console.log("In FFX **********");




/*
12/27/21
Check in non-functional initial code skeleton.

How to compile:
node FFX.js
*/


 

function encrypt(key, data) {
    const ciphertext = CryptoJS.AES.encrypt(
        CryptoJS.enc.Hex.parse(data),
        CryptoJS.enc.Hex.parse(key),
        {
            padding: CryptoJS.pad.NoPadding,
            mode: CryptoJS.mode.CBC,
            iv: CryptoJS.enc.Hex.parse(key)
        },
    ).toString();
    return Buffer.from(ciphertext, 'base64').toString('hex');
}


const {
    getCiphers,
  } = require('crypto');
const {
    getHashes,
  } = require('crypto');



let FFX  = class {
	radix = 0;
	txtmin = 0;
	txtmax = 0;
	twkmin = 0;
	twkmax = 0;
	twk = [];
	constructor(key, twk, txtmax, twkmin, twkmax, radix)
	{
		var txtmin = 0;


        /* all 3 key sizes of AES are supported */
        switch (key.length)
		{
			case 16:
			case 24:
			case 32:
				break;
			default:
                throw new Error("key size error");
		}


        /*
         * FF1 and FF3-1 support a radix up to 65536, but the
         * implementation becomes increasingly difficult and
         * less useful in practice after the limits below.
         */
        if (radix < 2 || radix > 36)
		{
            throw new Error("invalid radix");
		}


        /*
         * for both ff1 and ff3-1: radix**minlen >= 1000000
         *
         * therefore:
         *   minlen = ceil(log_radix(1000000))
         *          = ceil(log_10(1000000) / log_10(radix))
         *          = ceil(6 / log_10(radix))
         */
        txtmin = parseInt(Math.ceil(6.0 / Math.log10(radix)));
		if (txtmin < 2 || txtmin > txtmax)
		{
            throw new Error("minimum text length out of range");
		}



        /* the default tweak must be specified */
        if (twk == null)
        {
            throw new Error("invalid tweak");
        }
        /* check tweak lengths */
        if (twkmin > twkmax || twk.length < twkmin || (twkmax > 0 && twk.length > twkmax))
        {
            throw new Error("invalid tweak length");
        }


		this.radix = radix;
		this.txtmin = txtmin;
		this.txtmax = txtmax;
		this.twkmin = twkmin;
		this.twkmax = twkmax;
        
        this.twk = [].concat(twk)

	}




    cipher(X, twk, encrypt) {

    }



    /*
     * perform an aes-cbc encryption (with an IV of 0) of @src, storing
     * the last block of output into @dst. The number of bytes in @src
     * must be a multiple of 16. @dst and @src may point to the same
     * location but may not overlap, otherwise. @dst must point to a
     * location at least 16 bytes long
     */
    prf(dst, doff, src, soff)
	{
		for (var i = 0; i < src.length; i += dst.length) {

        }
	}



    /*
     * perform an aes-ecb encryption of @src. @src and @dst must each be
     * 16 bytes long, starting from the respective offsets. @src and @dst
     * may point to the same location or otherwise overlap
     */
    ciph(dst, doff, src, soff)
	{
		this.prf(dst, doff, src, soff);
	}


    /*
     * a convenience version of the ciph function that returns its
     * output as a separate byte array
     */
    ciph(src) {
		var dst = Array(111111).fill(null);    // 111111 is this.cipher.getBlockSize()
		this.ciph(dst, 0, src, 0);
		return dst;
	}


    /*
     * reverse the bytes in a byte array. @dst and @src may point
     * to the same location but may not otherwise overlap
     */
    static rev(dst, src) {
		var i = 0;
		for (i = 0; i < parseInt(src.length / 2); i++)
		{
			var t = src[i];
			dst[i] = src[src.length - i - 1];
			dst[src.length - i - 1] = t;
		}
		if (src.length % 2 == 1)
		{
			dst[i] = src[i];
		}
	}


    /*
     * convenience function that returns the reversed sequence
     * of bytes as a new byte array
     */
    static rev(src) {
		var dst = Array(src.length).fill(null);
		FFX.rev(dst, src);
		return dst;
	}


    /*
     * reverse the characters in a string
     */
    static rev(str) {
		var sb = java.lang.StringBuilder(str);
		return sb.reverse().toString();
	}


    /*
     * Perform an exclusive-or of the corresponding bytes
     * in two byte arrays
     */
    static xor(d, doff, s1, s1off, s2, s2off, len) {
		for (var i = 0; i < len; i++)
		{
			d[doff + i] = (byte)(s1[s1off + i] ^ s2[s2off + i]);
		}
	}


    /*
     * convert a big integer to a string under the radix @r with
     * length @m. If the string is longer than @m, the function fails.
     * if the string is shorter that @m, it is zero-padded to the left
     */
    static str(m, r, i) {
		var s = i.toString(r);
		if (s.length > m)
		{
			throw java.lang.RuntimeException("string exceeds desired length");
		}
		else if (s.length < m)
		{
			var sb = java.lang.StringBuilder();
			while (sb.length() < m - s.length)
			{
				sb.append('0');
			}
			sb.append(s);
			s = sb.toString();
		}
		return s;
	}



    /**
     * Encrypt a string, returning a cipher text using the same alphabet.
     *
     * The key, tweak parameters, and radix were all already set
     * by the initialization of the FF3_1 object.
     *
     * @param X   the plain text to be encrypted
     * @param twk the tweak used to perturb the encryption
     *
     * @return    the encryption of the plain text, the cipher text
     */
     encrypt(X, twk) {
         return "";
     }


    /**
     * Encrypt a string, returning a cipher text using the same alphabet.
     *
     * The key, tweak parameters, and radix were all already set
     * by the initialization of the FF3_1 object.
     *
     * @param X   The plain text to be encrypted
     *
     * @return    the encryption of the plain text, the cipher text
     */
     encrypt(X) {
         return "";
     }


    /**
     * Decrypt a string, returning the plain text.
     *
     * The key, tweak parameters, and radix were all already set
     * by the initialization of the FF3_1 object.
     *
     * @param X   the cipher text to be decrypted
     * @param twk the tweak used to perturb the encryption
     *
     * @return    the decryption of the cipher text, the plain text
     */
     decrypt(X, twk) {
         return "";
     }


    /**
     * Decrypt a string, returning the plain text.
     *
     * The key, tweak parameters, and radix were all already set
     * by the initialization of the FF3_1 object.
     *
     * @param X   the cipher text to be decrypted
     *
     * @return    the decryption of the cipher text, the plain text
     */
     decrypt(X) {
         return this.decrypt(X, null);
     }


    
} 




/* make available to other modules */
module.exports = FFX