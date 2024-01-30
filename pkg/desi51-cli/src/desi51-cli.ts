#!/usr/bin/env node
// desi51-cli.ts

import type { tAllPageDef } from 'geometrix';
import { geom_cli } from 'geomcli';
import packag from '../package.json';
import { myPartADef, myPartBDef, myPartCDef, myPartDDef, myPartEDef, myPartFDef } from 'desi51';

const designList: tAllPageDef = {
	'myGroup1/myPartA': myPartADef,
	'myGroup1/myPartB': myPartBDef,
	'myGroup1/myPartC': myPartCDef,
	'myGroup1/myPartD': myPartDDef,
	'myGroup2/myPartE': myPartEDef,
	'myGroup2/myPartF': myPartFDef
};

//console.log('desi51-cli says hello');
await geom_cli(process.argv, designList, packag, 'output');
//console.log('desi51-cli says bye');
