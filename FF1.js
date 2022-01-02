const FFX = require('./FFX')
var bigInt = require("big-integer");
const CryptoJS = require('crypto-js');

console.log("In FF1 **********");



/*
12/27/21
Check in non-functional initial code skeleton.

How to compile:
node FF1.js
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



class FF1 extends FFX
{
	constructor(key, twk, twkmin, twkmax, radix)
	{
        super(key, twk, 1 << 32, twkmin, twkmax, radix);
	}
	/*
	 * The comments below reference the steps of the algorithm described here:
	 *
	 * https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-38Gr1-draft.pdf
	 */
	cipher(X, twk, encrypt)
	{
        /* Step 1 */
		var n = X.length;
		var u = parseInt(n / 2);
		var v = n - u;

		/* Step 3, 4 */
		var b = parseInt((parseInt(Math.ceil((Math.log(this.radix) / Math.log(2)) * v)) + 7) / 8);
		var d = 4 * (parseInt((b + 3) / 4)) + 4;
		var p = 16;
		var r = (parseInt((d + 15) / 16)) * 16;
		var A = null;
		var B = null;
		var PQ = [];
		var R = [];
		var q = 0;
		/* use default tweak if none is supplied */
		if (twk == null)
		{
			twk = this.twk;
		}
		/* check text and tweak lengths */
		if (n < this.txtmin || n > this.txtmax)
		{
			throw new Error("invalid input length");
		}
		else if (twk.length < this.twkmin || (this.twkmax > 0 && twk.length > this.twkmax))
		{
			throw new Error("invalid tweak length");
		}
		/* the number of bytes in Q */
		q = (parseInt((twk.length + b + 1 + 15) / 16)) * 16;
		/*
		 * P and Q need to be adjacent in memory for the
		 * purposes of encryption
		 */
		PQ = Array(p + q).fill(null);
		R = Array(r).fill(null);
		/* Step 2 */
		if (encrypt)
		{
			A = X.substring(0, u);
			B = X.substring(u);
		}
		else
		{
			B = X.substring(0, u);
			A = X.substring(u);
		}
		/* Step 5 */
		PQ[0] = 1;
		PQ[1] = 2;
		PQ[2] = 1;
		PQ[3] = (byte)(this.radix >> 16);
		PQ[4] = (byte)(this.radix >> 8);
		PQ[5] = (byte)(this.radix >> 0);
		PQ[6] = 10;
		PQ[7] = (byte)(u);
		PQ[8] = (byte)(n >> 24);
		PQ[9] = (byte)(n >> 16);
		PQ[10] = (byte)(n >> 8);
		PQ[11] = (byte)(n >> 0);
		PQ[12] = (byte)(twk.length >> 24);
		PQ[13] = (byte)(twk.length >> 16);
		PQ[14] = (byte)(twk.length >> 8);
		PQ[15] = (byte)(twk.length >> 0);
		/* Step 6i, the static parts */
		System.arraycopy(twk, 0, PQ, p, twk.length);
		/* remainder of Q already initialized to 0 */
		for (var i = 0; i < 10; i++)
		{
			/* Step 6v */
			var m = (((i + (encrypt ? 1 : 0)) % 2) == 1) ? u : v;
			var c = null;
			var y = null;
			var numb = [];
			/* Step 6i, the non-static parts */
			PQ[PQ.length - b - 1] = (byte)(encrypt ? i : (9 - i));
			/*
				* convert the numeral string B to an integer and
				* export that integer as a byte array into Q
				*/
            c = bigInt(B, this.radix);
			numb = c.toByteArray();
			if (numb[0] == 0 && numb.length > 1)
			{
				/*
				 * Per the Java documentation, BigInteger.toByteArray always
				 * returns enough bytes to contain a sign bit. For the purposes
				 * of this function all numbers are unsigned; however, when the
				 * most-significant bit is set in a number, the Java library
				 * returns an extra most-significant byte that is set to 0.
				 * That byte must be removed for the cipher to work correctly.
				 */
				numb = Arrays.copyOfRange(numb, 1, numb.length);
			}
			if (b <= numb.length)
			{
				System.arraycopy(numb, 0, PQ, PQ.length - b, b);
			}
			else
			{
				/* pad on the left with zeros */
				Arrays.fill(PQ, PQ.length - b, PQ.length - numb.length, (byte)(0));
				System.arraycopy(numb, 0, PQ, PQ.length - numb.length, numb.length);
			}
			/* Step 6ii */
			/*
			 * Step 6iii
			 * if r is greater than 16, fill the subsequent blocks
			 * with the result of ciph(R ^ 1), ciph(R ^ 2), ...
			 */
			for (var j = 1; j < parseInt(r / 16); j++)
			{
				var l = j * 16;
				Arrays.fill(R, l, l + 12, (byte)(0));
				R[l + 12] = (byte)(j >> 24);
				R[l + 13] = (byte)(j >> 16);
				R[l + 14] = (byte)(j >> 8);
				R[l + 15] = (byte)(j >> 0);
			}
			/*
			 * Step 6vi
			 * calculate A +/- y mod radix**m
			 * where y is the number formed by the first d bytes of R
			 */
            y = bigInt(Arrays.copyOf(R, d));
            y = y.mod(bigInt.one.shiftLeft(8 * d));
            c = bigInt(A, this.radix);
			if (encrypt)
			{
				c = c.add(y);
			}
			else
			{
				c = c.subtract(y);
			}
            c = c.mod(bigInt(this.radix).pow(m));
			/* Step 6viii */
			A = B;
		}
		/* Step 7 */
		return encrypt ? (A + B) : (B + A);



	}
}


/* make available to other modules */
module.exports = FF1
