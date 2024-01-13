// myPartB.ts
// tutorial-2 : demonstrate all parameter types

import type {
	//tContour,
	tParamDef,
	tParamVal,
	tGeom,
	//tExtrude,
	tPageDef
	//tSubInst
	//tSubDesign
} from 'geometrix';
import {
	contour,
	contourCircle,
	figure,
	//degToRad,
	//radToDeg,
	ffix,
	pNumber,
	pCheckbox,
	pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'myPartB',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('L1', 'mm', 60, 10, 100, 10),
		pDropdown('extShape', ['circle', 'triangle-up', 'triangle-down']),
		pNumber('D1', 'mm', 50, 10, 200, 5),
		pCheckbox('hollow', true),
		pDropdown('intShape', ['straight', 'slanted']),
		pNumber('S1', 'mm', 20, 1, 100, 1)
	],
	paramSvg: {
		L1: 'myPartB_side.svg',
		extShape: 'myPartB_front.svg',
		D1: 'myPartB_front.svg',
		hollow: 'myPartB_hollow.svg',
		intShape: 'myPartB_hollow_shape.svg',
		S1: 'myPartB_hollow_shape.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom(pDef.partName);
	const figFront = figure();
	const figSide = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		const R1 = param.D1 / 2;
		const triA = R1 / Math.sqrt(1 + 2 ** 2); // R1 / 2.23
		if (triA < param.S1 / 2) {
			throw `err063: D1 ${param.D1} too small compare to S1 ${param.S1}`;
		}
		rGeome.logstr += `myPartB-length: ${ffix(param.L1)} mm\n`;
		// figFront
		switch (param.extShape) {
			case 0: // circle
				figFront.addMain(contourCircle(0, 0, R1));
				break;
			case 1: // triangle-up
				{
					const ctr1 = contour(0, R1)
						.addSegStrokeR(-2 * triA, -triA - R1)
						.addSegStrokeR(4 * triA, 0)
						.closeSegStroke();
					figFront.addMain(ctr1);
				}
				break;
			case 2: // triangle-down
				{
					const ctr2 = contour(0, -R1)
						.addSegStrokeR(2 * triA, triA + R1)
						.addSegStrokeR(-4 * triA, 0)
						.closeSegStroke();
					figFront.addMain(ctr2);
				}
				break;
			default:
				throw `err087: param.extShape ${param.extShape} unkown!`;
		}
		if (param.hollow) {
			const ctr3 = contour(-param.S1 / 2, -param.S1 / 2)
				.addSegStrokeR(param.S1, 0)
				.addSegStrokeR(0, param.S1)
				.addSegStrokeR(-param.S1, 0)
				.closeSegStroke();
			switch (param.intShape) {
				case 0: // straight
					figFront.addMain(ctr3);
					break;
				case 1: // slanted
					figFront.addMain(ctr3.rotate(0, 0, Math.PI / 4));
					break;
				default:
					throw `err107: param.intShape ${param.intShape} unkown!`;
			}
		}
		// figSide
		const ctrSide = contour(-param.L1 / 2, -R1)
			.addSegStrokeR(param.L1, 0)
			.addSegStrokeR(0, 2 * R1)
			.addSegStrokeR(-param.L1, 0)
			.closeSegStroke();
		figSide.addSecond(ctrSide);
		// final figure list
		rGeome.fig = {
			faceFront: figFront,
			faceSide: figSide
		};
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}`,
					face: `${designName}_faceFront`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.L1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`subpax_${designName}`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'myPartB draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const myPartBDef: tPageDef = {
	pTitle: 'My Part-B',
	pDescription: 'A simple part for showcasing the possible parameter types',
	pDef: pDef,
	pGeom: pGeom
};

export { myPartBDef };
