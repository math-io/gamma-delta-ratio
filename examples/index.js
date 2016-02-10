'use strict';

var linspace = require( 'compute-linspace' );
var gammaDeltaRatio = require( './../lib' );

var x = linspace( 0, 10, 100 );
var v;
var i;

for ( i = 0; i < x.length; i++ ) {
	v = gammaDeltaRatio( x[ i ], 2 );
	console.log( 'x: %d, delta: %d, f(x): %d', x[ i ], 2, v );
}
