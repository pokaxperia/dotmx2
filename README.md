DotMx 2
====================
Desarrollo Orientado al Transporte

Requirements
-------
- [nodejs](https://nodejs.org/)
- [bower](http://bower.io/#install-bower)

First
-------
Clone:

```
$ git clone https://github.com/pokaxperia/dotmx2.git
```

or [download ZIP](https://github.com/pokaxperia/dotmx2/archive/master.zip).


Install packages and dependencies
-------
**Important** Make sure you go to the root folder before run installs.
##### For frontend packages:
```
$ bower install
```
##### For gulp packages and dependencies:
```
$ npm install
```
or for root permissions:
```
$ sudo npm install
```

Folder Structure
-------
```
.dotmx
|--bower_components/        # Frontend packages
|--node_modules/            # browser-sync, gulp and dependencies
|--build/                   # Main Prod (only for production)
|   |_ components
|   |_ descargas
|   |_ iconfonts
|   |_ images
|   |_ styles
|   |_ js
|   |_ index.html           # Main index for prod server
|--client               # Main DEV
|   |_ components
|   |   |_ ...          # html and js components (angular)
|   |   |_ emus.module  # Main angular module
|   |   |_ emus.routes  # Routes
|   |_ iconfonts
|   |_ images
|   |_ js
|   |_ styles
|   |   |_  ...         # Sass stylesheets for each view's component 
|   |_ index.html       # Main index for Dev server
|--tmp                  # Final template file from each angular view (html, for production)
```

Quick start (dev server)
-------
Run **gulp**:
```js
$ gulp dev
```
For Production
-------
  
1. Run **gulp join**.

  ```js
  $ gulp join
  ```
  this concatenate all css ans js into respective file (styles.css, app.js and lib.js) for production.

