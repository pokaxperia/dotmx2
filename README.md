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

Install packages and dependencies
-------
Replace:
- bower_components/leaflet-sidebar/src/L.Control.Sidebar.css
- bower_components/leaflet-sidebar/src/L.Control.Sidebar.js

With this:
[download files from dropbox](https://www.dropbox.com/home/leaflet).


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
|   |   |_ modules.js  # Main angular module
|   |   |_ routes.js  # Routes
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
If edit html, run:
- **gulp templatecache**
- **gulp html**


If edit js/css, run:
- **gulp join**




