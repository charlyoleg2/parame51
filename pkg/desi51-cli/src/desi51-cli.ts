#!/usr/bin/env node
// desi51-cli.ts

import type { tAllPageDef } from 'geometrix';
import { geom_cli } from 'geomcli';
import packag from '../package.json';
import {
	myPartADef
	//myPartBDef,
	//myPartCDef
} from 'desi51';

const designList: tAllPageDef = {
	'myGroup1/myPartA': myPartADef
	//'myGroup1/myPartB': myPartBDef,
	//'myGroup2/myPartC': myPartCDef
};

//console.log('desi51-cli says hello');
await geom_cli(process.argv, designList, packag, 'output');
//console.log('desi51-cli says bye');
