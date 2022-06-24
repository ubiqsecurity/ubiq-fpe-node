const bigInt = require('big-integer');
const FFX = require('./FFX');
const errorMessages = require('./errorMessages');
const arrayUtil = require('./arrayUtil');

class FF3_1 extends FFX {
	/// <summary>
	/// Constructs a new context object for the FF3-1 algorithm
	/// </summary>
	/// <param name="key">a byte array containing the key</param>
	/// <param name="twk">
	///		a byte array containing the "tweak" or IV. this value
	///		may not be null, and the number of bytes must be between
	///		the minimum and maximum allowed sizes
	/// </param>
	/// <param name="radix">
	///		the radix of the alphabet used for the plain and cipher
	///		text inputs/outputs
	/// </param>
	constructor(key, twk, radix) {
		super(key.reverse(), twk, (192.0 / (Math.log10(radix) / Math.log10(2))), 7, 7, radix);
	}

	// Cipher(string x, byte[] twk, bool encrypt)
	cipher(x, twk, encrypt) {
		// Step 1
		const n = x.length;
		const v = n / 2;
		const u = n - v;

		let A;
		let B;
		let Tw = [];
		let P = [];

		// use default tweak if none is supplied
		if (twk === null) {
			this.twk = twk;
		}

		// check text tweak if none is supplied
		if (n < this.txtmin || n > this.txtmax) {
			throw new Error(errorMessages.InvalidInputLength);
		} else if (twk.length < this.twkmin || (this.twkmax > 0 && twk.length > this.twkmax)) {
			throw new Error(errorMessages.InvalidTweakLength);
		}

		// Step 2
		if (encrypt) {
			A = x.substring(0, u);
			B = x.substring(u);
		} else {
			B = x.substring(0, u);
			A = x.substring(u);
		}

		// Step 3
		Tw = new Array(2);
		Tw[0] = new Uint8Array(4);
		Tw[1] = new Uint8Array(4);

		/*
				this.arrayCopy(twk, 0, Tw[0], 0, 3);
				Tw[0][3] = (twk[3] & 0xf0);

									this.arrayCopy(twk, 4, Tw[1], 0, 3);
				Tw[1][3] = ((twk[3] & 0x0f) << 4);
		*/
		P = new Uint8Array(16);

		for (let i = 0; i < 8; i++) {
			// Step 4i
			const m = (((i + (encrypt ? 1 : 0)) % 2) === 1) ? u : v;
			let c;
			let y;
			const numb = [];
			let base2Numb = [];

			// Step 4i, 4ii
			arrayUtil.arrayCopy(Tw[(i + (encrypt ? 1 : 0)) % 2], 0, P, 0, 4);

			P[3] ^= (encrypt ? i : (7 - i));

			/*
			   * reverse B and convert the numeral string to an
			   * integer. then, export that integer as an array.
			   * store the array into the latter part of P
			   */
			c = bigInt(FFX.revStr(B), this.radix);
			base2Numb = this.BigIntToByteArray(c);
			base2Numb.reverse();
			if (base2Numb[0] === 0 && base2Numb.length > 1) {
				/*
				 * Per the Java documentation, bigInt.toByteArray always
				 * returns enough bytes to contain a sign bit. For the purposes
				 * of this function all numbers are unsigned; however, when the
				 * most-significant bit is set in a number, the Java library
				 * returns an extra most-significant byte that is set to 0.
				 * That byte must be removed for the cipher to work correctly.
				 */
				// numb = arrayUtil.copyOfRange(numb, 1, numb.length);
				arrayUtil.copyOfRange(base2Numb, 1, numb.length, numb);
			}
			if (numb.length >= 12) {
				arrayUtil.arrayCopy(numb, 0, P, 4, 12);
			} else {
				/* zero pad on the left */
				P.fill(0, 4, P.length - numb.length);
				arrayUtil.arrayCopy(numb, 0, P, P.length - numb.length, numb.length);
			}

			/* Step 4iv */

			P = FFX.rev(this.ciph(FFX.rev(P)));

			/*
			 * Step 4v
			 * calculate reverse(A) +/- y mode radix**m
			 * where y is the number formed by the byte array P
			 */
			y = bigInt(this.ByteArrayToBigInt(P));
			y %= bigInt.one.shiftLeft(16 * 8);
			c = bigInt(FFX.rev(A), this.radix);
			if (encrypt) {
				c = c.add(y);
			} else {
				c = c.subtract(y);
			}

			c %= bigInt(this.radix).pow(m);

			/* Step 4vii */
			A = B;
			/* Step 4vi */
			B = this.rev(this.str(m, this.radix, c));
		}

		/* Step 5 */
		return encrypt ? (A + B) : (B + A);
	}

	encrypt(X) {
		return this.cipher(X, null, true);
	}
}
module.exports = FF3_1;
