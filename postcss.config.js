const pkg = require('./package.json');

module.exports = {
	// The list of plugins for PostCSS  https://github.com/postcss/postcss
	plugins: {
		// Transfer @import rule by inlining content, e.g. @import 'normalize.css'
		'postcss-import': {},

		// PostCSS plugin to use tomorrow's CSS syntax, today. http://cssnext.io/
		'postcss-cssnext': {
			browsers: pkg.browserslist,
		},

		// Postcss flexbox bug fixer
		'postcss-flexbugs-fixes': {},

		// W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
		'postcss-custom-properties': {},

		// W3C calc() function, e.g. div { height: calc(100px - 2em); }
		'postcss-calc': {},

		// Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
		'pleeease-filters': {
			oldIE: false // ex. progid:DXImageTransform.Microsoft.Blur(pixelradius=4);
		},

		// Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
		'node-pixrem': {},

		// W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
		'postcss-selector-matches': {},

		// Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
		'postcss-selector-not': {},

		// Add vendor prefixes to CSS rules using values from caniuse.com
		'autoprefixer': {
			browsers: pkg.browserslist,
			flexbox: 'no-2009'
		}
	}
};
