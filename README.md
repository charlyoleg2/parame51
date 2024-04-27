Parame51
========


Presentation
------------

This repository is a monorepo of the following *javascript* packages:

1. desi51: an example library of 3D-parts using [geometrix](https://www.npmjs.com/package/geometrix)
2. desi51-ui: a *sveltekit* app that showcases *desi51* in a minimalist way
3. desi51-cli: the *nodejs* cli that showcases the usage of *desi51*

A public instance of *desi51-ui* is available on that [github-page](https://charlyoleg2.github.io/parame51/).
The *code source* is available on [github](https://github.com/charlyoleg2/parame51).

The design-library *desi51* is part of the *parametrix* [tutorial](https://charlyoleg2.github.io/parametrix/docs/geom_tutorial).

If you want to have full control on your CLI and UI of your own *design-library*, you can use *parame51* as template.
Otherwise, for automatically generated CLI and UI, use *parame52* as template.


Packages details
----------------

| id | package name        | lib or app | browser env | nodejs env |
|----|---------------------|------------|-------------|------------|
| 1  | desi51              | lib        | yes         | yes        |
| 2  | desi51-ui           | app        | yes         |            |
| 3  | desi51-cli          | app        |             | yes        |


Links
-----

- [desi51-ui](https://charlyoleg2.github.io/parame51/) : public instance of the UI
- [sources](https://github.com/charlyoleg2/parame51) : git-repository
- [pkg](https://www.npmjs.com/package/desi51) : desi51 as npm-package


Prerequisite
------------

- [node](https://nodejs.org) version 20.10.0 or higher
- [npm](https://docs.npmjs.com/cli/v7/commands/npm) version 10.5.0 or higher


Getting started
---------------

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
npm run ls-pkg
npm -w desi51 run check
npm -w desi51 run build
npm -w desi51-ui run dev
```

Publish a new release
---------------------

```bash
npm run versions
vim scr/patchPaxApps.patch
git diff
git commit -am 'increment sub versions'
npm version patch
git push
git push origin v0.5.6
```
