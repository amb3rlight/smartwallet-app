little-sister
=============

PLEASE NOTE: This branch was the final release deploy for ouishare festival 2016 that still relies on Gold server.

[![](https://img.shields.io/badge/project-Solid-7C4DFF.svg?style=flat-square)](https://github.com/solid/solid) [![Dependency Status](https://david-dm.org/jolocom/little-sister/develop.svg)](https://david-dm.org/jolocom/little-sister/develop) [![Stories in Progress](https://badge.waffle.io/jolocom/little-sister.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/jolocom/little-sister)

little-sister - Social app / linked data explorer built for [SoLiD](https://github.com/linkeddata/SoLiD) servers like [rww-play](https://github.com/read-write-web/rww-play) or [gold](https://github.com/linkeddata/gold)

Setup
-----

## Installing dependencies

```bash
npm install -g gulp
npm install
```

## Generating base data

For the application to be useful you need a minimum data setup (at least one node representing a user profile). Instead of having to write the RDF files manually you can generate them using a python script.

### Install python tools

Make sure you use python 2.x when installing soliddata, e.g.

```
cd utils/soliddata; python2.7 setup.py develop
```
Running the `setup.py` using python3 will cause errors in further steps. 

### Generate testdata for single test server (https://localhost:8443)
```
soliddata --blueprint utils/soliddata/local.json --output-dir data --flatten
```
In case this command throws the `object of type 'map' has no len()` error, reinstall the _python tools for test data generation_ using python2 rather than python3. The error is caused by the _rdflib_ library not supporting python3.

## Building
```bash
gulp build-dev
```
**Warning:** calling "gulp" is dangerous, as it will start the webpack-dev-server which will overshadow ports 8080,8443 that the Gold server users

###Build-Prod
`bash gulp build`has a similar effect to just using `bash gulp`, except it runs some additional, non vital operations (for example asset minimization) that make the final `app.js` file more optimized. </br>Running `gulp-prod` takes more time, and can therefore cause the development feedback cycle to take longer, as a result of that it shouldn't really be used during development.


### Webroot
You have to setup your SoLiD server to point to `dist/` directory (built by `gulp` in the previous step)


## Running
You need to start your solid server (e.g. gold) listening on port :8443 before you can use the app, e.g.

`docker run -p 127.0.0.1:8443:443 -v /home/myuser/projects/little-sister/dist:/data linkeddata/gold`


Documentation
-------------

Additional documentation can be found at our [wiki](https://github.com/jolocom/little-sister/wiki).


git-flow
--------
We are using git-flow to manage our branching strategy. More details can be found in [this article](http://nvie.com/posts/a-successful-git-branching-model/). Also, you should install a plugin for your git command line: [nvie/gitflow](https://github.com/nvie/gitflow).

Once you have installed the git flow plugin, you should initialize its branch mappings with this command:
```bash
git flow init -d
```

Copyright (C) 2015  JOLOCOM UG
