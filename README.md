# Static website builder

Simple starter for a Bootstrap & Handlebars based websites

## Installation
Clone project
```
git clone
```
Install dependencies
```
yarn install
```

## Running locally (development)

```yarn start``` will run website locally using _webpack-dev-server_, watch files for any changes and reload your browser automatically. Go to **http://localhost:9000**


## Build for production

```yarn build``` will create /dist folder with optimized bundles, including:
- Prerendered Handlebars templates
- Removed unused CSS - [purifycss-webpack](https://github.com/webpack-contrib/purifycss-webpack)
- Minified JS
- Optimized image files
- Created 37 different icons generated and added to html pages (from single PNG image)
- [Resource hints](https://www.w3.org/TR/resource-hints/) (Disabled atm, while I do some more cross-browser testing of [resource-hints-webpack-plugin](https://github.com/jantimon/resource-hints-webpack-plugin))

### Bootstrap dependencies
In order to optimize [Bootstrap v4](https://v4-alpha.getbootstrap.com/) several plugins and loaders were needed
- bootstrap@v4.0.0-alpha.6
- bootstrap-loader
- resolve-url-loader 
- url-loader
- imports-loader 
- exports-loader

**PostCSS** - Bootstrap 4 seems to require postcss
- postcss
- postcss-loader (with default postcss.config.js)

**Configuration file**
- .bootstraprc config file is recommended

Bootstrap uses **SASS** since v4, so following are also required:
- css-loader 
- node-sass

**Disable scripts** (optional)
If you need Bootstrap for grid/styles only - you do not need jQuery and the rest of Bootstrap's scripts
https://github.com/shakacode/bootstrap-loader#scripts
In .bootstraprc change `scripts: false`