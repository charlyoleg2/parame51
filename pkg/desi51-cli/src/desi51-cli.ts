#!/usr/bin/env node
// desi51-cli.ts

import type { tAllPageDef } from 'geometrix';
import { geom_cli } from 'geomcli';
import packag from '../package.json';
import {
	myPartADef,
	myPartBDef,
	myPartCDef,
	myPartDDef,
	myPartEDef,
	myPartFDef,
	myPartGDef,
	myPartHDef,
	myPartIDef,
	myPartJDef,
	myPartKDef
} from 'desi51';

const designList: tAllPageDef = {
	'desi51/myGroup1/myPartA': myPartADef,
	'desi51/myGroup1/myPartB': myPartBDef,
	'desi51/myGroup1/myPartC': myPartCDef,
	'desi51/myGroup1/myPartD': myPartDDef,
	'desi51/myGroup2/myPartE': myPartEDef,
	'desi51/myGroup2/myPartF': myPartFDef,
	'desi51/myGroup2/myPartG': myPartGDef,
	'desi51/myGroup2/myPartH': myPartHDef,
	'desi51/myGroup2/myPartI': myPartIDef,
	'desi51/myGroup2/myPartJ': myPartJDef,
	'desi51/myGroup2/myPartK': myPartKDef
};

//console.log('desi51-cli says hello');
await geom_cli(process.argv, designList, packag, 'output');
//console.log('desi51-cli says bye');
