'use strict';

/**
* NOTE: the original C++ code and copyright notice is from the [Boost library]{http://www.boost.org/doc/libs/1_51_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/**
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var isNegativeInteger = require( 'validate.io-negative-integer' );
var isnan = require( 'validate.io-nan' );
var abs = require( 'math-abs' );
var evalrational = require( 'math-evalrational' );
var exp = require( 'math-exp' );
var log1p = require( 'math-float64-log1p' );
var pow = require( 'math-power' );


// CONSTANTS //

var NINF = Number.NEGATIVE_INFINITY;
var E = require( 'const-e' );

// LANCZOS APPROXIMATION CONSTANTS //

var G = 10.90051099999999983936049829935654997826;
var NUM = [
	38474670393.31776828316099004518914832218,
	36857665043.51950660081971227404959150474,
	15889202453.72942008945006665994637853242,
	4059208354.298834770194507810788393801607,
	680547661.1834733286087695557084801366446,
	78239755.00312005289816041245285376206263,
	6246580.776401795264013335510453568106366,
	341986.3488721347032223777872763188768288,
	12287.19451182455120096222044424100527629,
	261.6140441641668190791708576058805625502,
	2.506628274631000502415573855452633787834
];
var DENOM = [
	0,
	362880,
	1026576,
	1172700,
	723680,
	269325,
	63273,
	9450,
	870,
	45,
	1
];


// FUNCTIONS //

var lanczosSum = evalrational.factory( NUM, DENOM );


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
