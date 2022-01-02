var bigInt = require("big-integer");



/**
 * Algorithms to convert a numerical value in a given alphabet to a number
 */
class Bn
{
	/**
     * Convert a numerical value in a given alphabet to a number.
     *
     * An alphabet consists of single-byte symbols in which each
     * symbol represents the numerical value associated with its
     * index/position in the alphabet. for example, consider the
     * alphabet: !@#$%^-*()
     * In this alphabet ! occupies index 0 and is therefore
     * assigned that value. @ = 1, # = 2, etc. Furthermore, the
     * alphabet contains 10 characters, so that becomes the radix
     * of the input. Using the alphabet above, an input of @$#
     * translates to a value of 132 (one hundred thirty-two,
     * decimal).
     *
     * If the alphabet above were instead: !@#$%^-*
     * The radix would be 8 and an input of @$# translates to a
     * value of 90 (ninety, decimal).
     *
     * @param str the numerical value to be converted
     * @param alpha alphabet consists of single-byte symbols
     *
     * @return the numerical value of the str pattern 
     * position found in the alphabet
     */
	
    static __bigint_set_str(str, alpha) {
        var len = str.length;
		/*
		 * the alphabet can be anything and doesn't have
		 * to be in a recognized canonical order. the only
		 * requirement is that every value in the list be
		 * unique. checking that constraint is an expensive
		 * undertaking, so it is assumed. as such, the radix
		 * is simply the number of characters in the alphabet.
		 */
		var rad = alpha.length;
		if (rad <= 0)
		{
			throw new Error("invalid argument, alphabet cannot be empty");
		}

        var a = bigInt();
		var i = 0;
		/* represents the numerical value of str */
        var x = bigInt(0);
		/*
		 * multiplier used to multiply each digit
		 * of the input into its correct position
		 */
        var m = bigInt(1);

		for (i = 0; i < len; i++)
		{
			var pos = 0;
			/*
			 * determine index/position in the alphabet.
			 * if the character is not present the input
			 * is not valid.
			 */
			pos = alpha.indexOf(str.charAt(len - 1 - i));
			if (pos < 0)
			{
				throw new Error("invalid argument, input character not found in alphabet");
			}
			/*
			 * multiply the digit into the correct position
			 * and add it to the result
			 */ 
            a = m * bigInt(pos);
			x = x + a;
			m = m * bigInt(rad);
		}
		return x;
    }





    /**
     * Inserts a character at a position in a String.
     *
     * Convenience function returns String with inserted char 
     * at an index position.
     *
     * @param str the original String
     * @param ch the character to insert
     * @param position the index position where to insert the ch
     *
     * @return    the new String containing the inserted ch 
     */ 
    static insertChar(str, ch, position) {
		return str.substring(0, position) + ch + str.substr(position);
	}


 
     


    /**
     * Gets the str pattern of the alphabet given the numeric value.
     *
     * @param alpha alphabet consists of single-byte symbols
     * @param x the numerical value of the str pattern
     *
     * @return the new String of the converted value 
     */ 
    static __bigint_get_str(alpha, x) {
		var rad = alpha.length;
        var quotient = bigInt();
		quotient = x;
		var str = "";

		if (rad <= 0)
		{
			throw new Error("invalid argument, alphabet cannot be empty");
		}

		/*
		 * to convert the numerical value, repeatedly
		 * divide (storing the resulted quotient and the remainder)
		 * by the desired radix of the output.
		 *
		 * the remainder is the current digit; the result
		 * of the division becomes the input to the next
		 * iteration
		 */
        while (bigInt(quotient).compareTo(bigInt(0)) != 0)
		{
			var remainder = 0;
			var result = bigInt(quotient).divmod(bigInt(rad));
            remainder = result.remainder;
            quotient = result.quotient;
			str = Bn.insertChar(str, alpha.charAt(remainder), 0);
		}

		if (str.length == 0)
		{
			str = Bn.insertChar(str, alpha.charAt(0), 0);
		}
		return str;
	}

}


/* make available to other modules */
exports.__bigint_set_str = Bn.__bigint_set_str;
exports.__bigint_get_str = Bn.__bigint_get_str;




