'use strict';

// MODULES //

var tape = require( 'tape' );
var incrspace = require( 'compute-incrspace' );
var reverse = require( 'compute-reverse' );
var abs = require( 'math-abs' );
var gammaDeltaRatio = require( './../lib' );
var gamma = require( 'math-gamma' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof gammaDeltaRatio === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` for `x = delta = 0`', function test( t ) {
	var v = gammaDeltaRatio( 0, 0 );
	t.ok( v !== v, 'returns NaN when provided x = 0, delta = 0' );
	t.end();
});

tape( 'the function returns `NaN` for negative integers `x`', function test( t ) {
	var values = incrspace( -1, -1000, -1 );
	var v;
	var i;

	for ( i = 0; i < values.length; i++ ) {
		v = gammaDeltaRatio( values[ i ], 0.5 );
		t.ok( v !== v, 'returns NaN when provided x:' + values[ i ] + 'and delta: 0.5' );
	}
	t.end();
});

tape( 'the function returns `NaN` if `x + delta` is a negative integer ', function test( t ) {
	var values = incrspace( 1, 1000, 1 );
	var delta;
	var v;
	var i;

	for ( i = 0; i < values.length; i++ ) {
		delta = (-1) * values[ i ] - 1;
		v = gammaDeltaRatio( values[ i ], delta );
		t.ok( v !== v, 'returns NaN when provided x: ' + values[ i ] + 'and delta: ' + delta );
	}
	t.end();
});

tape( 'if provided negative infinity for x, the function returns `NaN`', function test( t ) {
	var v = gammaDeltaRatio( Number.NEGATIVE_INFINITY, 0.5 );
	t.ok( v !== v, 'returns NaN when provided x = -Infinity and delta = 0.5' );
	t.end();
});

tape( 'if provided negative infinity for delta, the function returns `NaN`', function test( t ) {
	var v = gammaDeltaRatio( 0.5, Number.NEGATIVE_INFINITY );
	t.ok( v !== v, 'returns NaN when provided x = 0.5 and delta = -Infinity' );
	t.end();
});

tape( 'the function returns `0` for `x + delta = 0`', function test( t ) {
	var v = gammaDeltaRatio( 2, -2 );
	t.ok( v  === 0, 'returns 0 when `x + delta = 0`' );
	t.end();
});

tape( 'the function evaluates the ratio Γ(x) / Γ(x+delta) for x = delta', function test( t ) {
	var delta;
	var epsilon;
	var tol;
	var v;
	var expected;
	var i;
	var x;

	x = incrspace( 1, 100, 0.5 );
	delta = incrspace( 1, 100, 0.5 );

	for ( i = 0; i < x.length; i++ ) {
		v = gammaDeltaRatio( x[ i ], delta[ i ] );
		expected = gamma( x[ i ] ) / gamma( x[ i ] + delta[ i ]);
		epsilon = abs( v - expected );
		tol = 1e-14 * Math.max( 1, abs( v ), abs( expected ) );
		t.ok( epsilon <= tol, 'within tolerance. x: ' + x[ i ] + '. delta: ' + delta[ i ] + ' Value: ' + v + '. Expected: ' + expected + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function evaluates the ratio Γ(x) / Γ(x+delta) for x != delta', function test( t ) {
	var delta;
	var epsilon;
	var tol;
	var v;
	var expected;
	var i;
	var x;

	x = incrspace( 1, 100, 0.5 );
	delta = reverse( incrspace( 1, 100, 0.5 ) );

	for ( i = 0; i < x.length; i++ ) {
		v = gammaDeltaRatio( x[ i ], delta[ i ] );
		expected = gamma( x[ i ] ) / gamma( x[ i ] + delta[ i ]);
		epsilon = abs( v - expected );
		tol = 1e-14 * Math.max( 1, abs( v ), abs( expected ) );
		t.ok( epsilon <= tol, 'within tolerance. x: ' + x[ i ] + '. delta: ' + delta[ i ] + ' Value: ' + v + '. Expected: ' + expected + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});
