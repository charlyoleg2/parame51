// myPartA.ts

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
	//pCheckbox,
	//pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

const pDef: tParamDef = {
	partName: 'myPartA',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 1000, 100, 4000, 10),
		pNumber('E1', 'mm', 30, 1, 80, 1),
		pNumber('H1', 'mm', 3000, 500, 8000, 100)
	],
	paramSvg: {
		D1: 'myPartA_top.svg',
		E1: 'myPartA_top.svg',
		H1: 'myPartA_side.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom(pDef.partName);
	const figTop = figure();
	const figSide = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		const R1 = param.D1 / 2;
		if (R1 < param.E1) {
			throw `err089: D1 ${param.D1} too small compare to E1 ${param.E1}`;
		}
		rGeome.logstr += `myPartA-height: ${ffix(param.H1)} mm\n`;
		rGeome.logstr += `myPartA-external-diameter: ${ffix(param.D1)} mm\n`;
		// figTop
		figTop.addMain(contourCircle(0, 0, R1));
		figTop.addMain(contourCircle(0, 0, R1 - param.E1));
		// figSide
		const ctrCylinderSideRight = contour(R1, 0)
			.addSegStrokeA(R1, param.H1)
			.addSegStrokeA(R1 - param.E1, param.H1)
			.addSegStrokeA(R1 - param.E1, 0)
			.closeSegStroke();
		const ctrCylinderSideLeft = contour(-R1, 0)
			.addSegStrokeR(param.E1, 0)
			.addSegStrokeR(0, param.H1)
			.addSegStrokeR(-param.E1, 0)
			.closeSegStroke();
		figSide.addMain(ctrCylinderSideRight);
		figSide.addSecond(ctrCylinderSideLeft);
		// final figure list
		rGeome.fig = {
			faceTop: figTop,
			faceSide: figSide
		};
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_using_top`,
					face: `${designName}_faceTop`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.H1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_using_side`,
					face: `${designName}_faceSide`,
					extrudeMethod: EExtrude.eRotate,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `ipax_${designName}_intermediate_1`,
					boolMethod: EBVolume.eUnion, // eIdentity, eIntersection, eUnion, eSubstraction
					inList: [`subpax_${designName}_using_top`, `ipax_${designName}_using_side`]
				},
				{
					outName: `ipax_${designName}_intermediate_2`,
					boolMethod: EBVolume.eIntersection,
					inList: [`subpax_${designName}_using_top`, `ipax_${designName}_using_side`]
				},
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`subpax_${designName}_using_top`]
				}
			]
		};
		// sub-design
		rGeome.sub = {};
		// finalize
		rGeome.logstr += 'myPartA draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const myPartADef: tPageDef = {
	pTitle: 'My Part-A',
	pDescription: 'A simple cylinder for showcasing the usage of geometrix',
	pDef: pDef,
	pGeom: pGeom
};

export { myPartADef };
