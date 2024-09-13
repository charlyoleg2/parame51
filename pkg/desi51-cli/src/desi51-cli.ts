#!/usr/bin/env node
// desi51-cli.ts

import { geom_cli } from 'geomcli';
import packag from '../package.json';
import { designList } from './designList';

//console.log('desi51-cli says hello');
await geom_cli(process.argv, designList, packag, 'output');
//console.log('desi51-cli says bye');
