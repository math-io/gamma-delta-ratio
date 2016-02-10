gamma-delta-ratio
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Calculates a ratio of [gamma functions][gamma-function]: Γ(x) / Γ(x + δ).


## Installation

``` bash
$ npm install math-gamma-delta-ratio
```


## Usage

``` javascript
var gammaDeltaRatio = require( 'math-gamma-delta-ratio' );
```


#### gammaDeltaRatio( x, delta )

Evaluates the ratio `Γ(x) / Γ(x + δ)`, where `Γ` is the [gamma function][gamma-function].

``` javascript
var val = gamma( 4, 0.5 );
// returns ~0.516

val = gamma( -3/2, 3 );
// returns ~2.667

val = gamma( -1/2, 1 );
// returns -2

val = gamma( 1/2, 1/2 );
// returns ~1.772
```


## Examples

``` javascript
var linspace = require( 'compute-linspace' );
var gammaDeltaRatio = require( 'math-gamma-delta-ratio' );

var x = linspace( 0, 10, 100 );
var v;
var i;

for ( i = 0; i < x.length; i++ ) {
	v = gammaDeltaRatio( x[ i ], 2 );
	console.log( 'x: %d, delta: %d, f(x): %d', x[ i ], 2, v );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-gamma-delta-ratio.svg
[npm-url]: https://npmjs.org/package/math-gamma-delta-ratio

[build-image]: http://img.shields.io/travis/math-io/gamma-delta-ratio/master.svg
[build-url]: https://travis-ci.org/math-io/gamma-delta-ratio

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/gamma-delta-ratio/master.svg
[coverage-url]: https://codecov.io/github/math-io/gamma-delta-ratio?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/gamma-delta-ratio.svg
[dependencies-url]: https://david-dm.org/math-io/gamma-delta-ratio

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/gamma-delta-ratio.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/gamma-delta-ratio

[github-issues-image]: http://img.shields.io/github/issues/math-io/gamma-delta-ratio.svg
[github-issues-url]: https://github.com/math-io/gamma-delta-ratio/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[gamma-function]: https://en.wikipedia.org/wiki/Gamma_function
