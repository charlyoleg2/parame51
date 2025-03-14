Parame51
========


Presentation
------------

*Parame51* is the top-monorepo for the design-library *desi51*, which contains a collection of 3D shapes.

This monorepo contains the following *javascript* package:

1. desi51: a *parametrix* design library
2. desi51-cli: the cli of desi51
3. desi51-ui: the web-ui of desi51
4. desi51-uis: the web-server of desi51-ui

This repo is a typical designer-repository using [parametrix](https://charlyoleg2.github.io/parametrix/).
The design-library and its associated UI and CLI are published as *npm-packages*.
The UI is also available on the github-page.


Links
-----

- [desi51-ui](https://charlyoleg2.github.io/parame51/) : public instance of the UI
- [sources](https://github.com/charlyoleg2/parame51) : git-repository
- [pkg](https://www.npmjs.com/package/desi51) : desi51 as npm-package
- [pkg-cli](https://www.npmjs.com/package/desi51-cli) : desi51-cli as npm-package
- [pkg-uis](https://www.npmjs.com/package/desi51-uis) : desi51-uis as npm-package

The design-library *desi51* is part of the *parametrix* [tutorial](https://charlyoleg2.github.io/parametrix/docs/geom_tutorial).


Usage for Makers
----------------

Parametrize and generate your 3D-files with the online-app:

[https://charlyoleg2.github.io/parame51/](https://charlyoleg2.github.io/parame51/)

Or use the UI locally:

```bash
npx desi51-uis
```

Or use the command-line-interface (CLI):

```bash
npx desi51-cli
```

Getting started for Dev
-----------------------

```bash
git clone https://github.com/charlyoleg2/parame51
cd parame51
npm i
npm run ci
npm run preview
```

Other useful commands:
```bash
npm run clean
npm run ls-workspaces
npm -w desi51 run check
npm -w desi51 run build
npm -w desi51-ui run dev
```

Prerequisite
------------

- [node](https://nodejs.org) version 20.10.0 or higher
- [npm](https://docs.npmjs.com/cli/v7/commands/npm) version 10.5.0 or higher


Publish a new release
---------------------

```bash
npm run versions
git commit -am 'increment sub versions'
npm version patch
git push
git push origin v0.5.6
```
