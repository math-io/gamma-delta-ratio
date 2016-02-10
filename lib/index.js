'use strict';

/**
* NOTE: the original C++ code is from the [Boost library]{http://www.boost.org/doc/libs/1_48_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

//  (C) Copyright John Maddock 2006.
//  Use, modification and distribution are subject to the
//  Boost Software License, Version 1.0. (See accompanying file
//  LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)

// MODULES //

var isNegativeInteger = require( 'validate.io-negative-integer' );
var isnan = require( 'validate.io-nan' );
var abs = require( 'math-abs' );
var exp = require( 'math-exp' );
var log1p = require( 'math-float64-log1p' );
var pow = require( 'math-power' );


// FUNCTIONS //

var lanczosSum = require( './lanczossum.js' );


// CONSTANTS //

var NINF = Number.NEGATIVE_INFINITY;
var E = require( 'const-e' );

// LANCZOS APPROXIMATION CONSTANTS //

var G = 10.90051099999999983936049829935654997826;


// RATIO OF GAMMA FCNS //

/**
* FUNCTION: gammaDeltaRatio( x, delta )
*	Computes a ratio of gamma functions: Γ(x) / Γ(x + δ).
*
* @param {Number} x - parameter for numerator
* @param {Number} delta - summand added to denominator parameter
* @returns {Number} function value
*/
function gammaDeltaRatio( z, delta ) {
	if (
		isNegativeInteger( z ) ||
		isNegativeInteger( z + delta ) ||
		z === NINF ||
		delta === NINF ||
		isnan( z ) ||
		isnan( delta ) 
	) {
		return NaN;
	}
	var zgh = z + G - 0.5;
	var result;
	if ( abs(delta) < 10 ) {
		result = exp( ( 0.5 - z ) * log1p( delta / zgh ) );
	}
	else {
		result = pow( zgh / (zgh + delta), z - 0.5 );
	}
	result *= pow( E / ( zgh + delta ), delta );
	result *= lanczosSum(z) / lanczosSum(z + delta);
	return result;
} // end FUNCTION gammaDeltaRatio()


// EXPORTS //

module.exports = gammaDeltaRatio;
