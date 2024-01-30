// designList.ts

import type { tAllPageDef } from 'geometrix';
import { myPartADef, myPartBDef, myPartCDef, myPartDDef, myPartEDef, myPartFDef } from 'desi51';

const designList: tAllPageDef = {
	'myGroup1/myPartA': myPartADef,
	'myGroup1/myPartB': myPartBDef,
	'myGroup1/myPartC': myPartCDef,
	'myGroup1/myPartD': myPartDDef,
	'myGroup2/myPartE': myPartEDef,
	'myGroup2/myPartF': myPartFDef
};

export { designList };
